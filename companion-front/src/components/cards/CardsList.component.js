import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import CardRow from './CardRow.component';
import AddCard from '../cards/AddCard.component';
import axios from 'axios';

class CardsList extends Component {
	constructor(props) {
		super(props);

		// Binding
		this.addCard = this.addCard.bind(this);
		this.deleteCard = this.deleteCard.bind(this);
		this.updateCard = this.updateCard.bind(this);

		// Empty state
		this.state = {
			cardsInDeck: [],
		};
	}

	componentDidMount() {
		this.getCardsInDeck();
	}

	getCardsInDeck() {
		this.setState({ cardsInDeck: [] });
		axios
			.get('http://localhost:4000/cards/', {
				params: {
					deck_id: this.props.deck_id,
				},
			})
			.then((response) => {
				let cardsInDeck = [];

				this.sortCards(response.data.cards);

				for (let card in response.data.cards) {
					cardsInDeck.push(response.data.cards[card]._id);
				}

				this.setState({ cardsInDeck: cardsInDeck });
			})
			.catch((err) => {
				console.log(`Error getting cards for deck: ${err}`);
			});
	}

	addCard(cardNameToAdd) {
		axios
			.get('http://localhost:4000/cards/', {
				params: {
					deck_id: this.props.deck_id,
					card_name: cardNameToAdd,
				},
			})
			.then((response) => {
				// Don't allow the quantity to update by way of the AddCard component,
				// because there is currently no way to update the state of the row from AddCard.
				if (response.data.cards.length === 0) {
					axios
						.get(
							`https://api.scryfall.com/cards/named?exact=${cardNameToAdd}`
						)
						.then((response) => {
							let apiString = 'http://localhost:4000/cards/add';
							let currentCard = {
								deck_id: this.props.deck_id,
								scryfall_id: response.data.id,
								card_qty: 1,
								card_name: response.data.name,
								card_type: this.showCardType(
									response.data.type_line
								),
								card_set: response.data.set,
								card_cmc:
									this.showCardType(
										response.data.type_line
									) === 'L'
										? 0
										: response.data.cmc,
								is_foil: false,
							};

							axios
								.post(apiString, currentCard)
								.then((response) => {
									// this.setState({
									// 	cardsInDeck: [
									// 		...this.state.cardsInDeck,
									// 		response.data.card_id,
									// 	],
									// });
									this.getCardsInDeck();
								});
						});
				}
			})
			.catch((err) => {
				console.log(`Error checking for existing cards: ${err}`);
			});
	}

	deleteCard(id) {
		axios
			.delete(`http://localhost:4000/cards/delete/${id}`)
			.then((response) => {
				// this.setState({
				// 	cardsInDeck: this.state.cardsInDeck.filter(
				// 		(card) => card !== id
				// 	),
				// });
				this.getCardsInDeck();
			})
			.catch((err) => {
				console.log(`Error deleting card: ${err}`);
			});
	}

	updateCard(updatedCard) {
		let apiString =
			'http://localhost:4000/cards/update/' + updatedCard.card_id;

		axios
			.post(apiString, updatedCard)
			.then((response) => {
				// console.log('Card update response', response);
				// this.getCardsInDeck();
			})
			.catch((err) => {
				console.log('Error updating card', err);

				if (err.response) {
					console.log('Error response data', err.response.data);
					console.log('Error response headers', err.response.headers);
					console.log('Error response config', err.response.config);
				} else if (err.request) {
					console.log('Error request', err.request);
				}
			});
	}

	showCardList() {
		return this.state.cardsInDeck.map((currentCard, i) => {
			return (
				<CardRow
					card_id={currentCard}
					key={i}
					deleteCard={this.deleteCard}
					updateCard={this.updateCard}
				/>
			);
		});
	}

	showCardType(cardTypeLine) {
		return cardTypeLine.includes('Land')
			? 'L'
			: cardTypeLine.includes('Creature')
			? 'C'
			: cardTypeLine.includes('Planeswalker')
			? 'P'
			: cardTypeLine.includes('Artifact')
			? 'A'
			: cardTypeLine.includes('Enchantment')
			? 'E'
			: cardTypeLine.includes('Instant')
			? 'I'
			: cardTypeLine.includes('Sorcery')
			? 'S'
			: 'X';
	}

	sortCards(thingsToSort) {
		let typeOrder = ['C', 'P', 'A', 'E', 'I', 'S', 'L'];
		let ordering = {};

		for (let i = 0; i < typeOrder.length; i++) {
			ordering[typeOrder[i]] = i;
		}

		// Sort by card type, then by CMC, then by name
		thingsToSort.sort((a, b) => {
			let n1 = a.card_name.toLowerCase();
			let n2 = b.card_name.toLowerCase();
			let t1 = a.card_type;
			let t2 = b.card_type;
			let c1 = a.card_cmc;
			let c2 = b.card_cmc;

			if (a.is_commander) return -1;
			if (b.is_commander) return 1;
			if (ordering[t1] < ordering[t2]) return -1;
			if (ordering[t1] > ordering[t2]) return 1;
			if (c1 < c2) return -1;
			if (c1 > c2) return 1;
			if (n1 < n2) return -1;
			if (n1 > n2) return 1;
			return 0;
		});
	}

	render() {
		if (this.state.is_loading) {
			return <div>"Loading..."</div>;
		}
		return (
			<div>
				<Table bordered striped hover size='sm'>
					<thead>
						<tr>
							<th>
								<AddCard
									deck_id={this.props.deck_id}
									addCard={this.addCard}
								/>
							</th>
							<th>Name</th>
							<th className='center-column'>Type</th>
							<th className='center-column'>Set</th>
							<th className='center-column'>Foil</th>
							<th className='center-column'>CMC</th>
							<th className='center-column'>
								<i className='fas fa-crown'></i>
							</th>
							<th className='center-column'>
								<Link to='/create'>
									<Button size='sm' variant='info'>
										<i className='fas fa-tag'></i>
									</Button>
								</Link>
							</th>
						</tr>
					</thead>
					<tbody>{this.showCardList()}</tbody>
				</Table>
			</div>
		);
	}
}

export default CardsList;
