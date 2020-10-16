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
		axios
			.get('http://localhost:4000/cards/', {
				params: {
					deck_id: this.props.deck_id,
				},
			})
			.then((response) => {
				let cardsInDeck = [];

				for (let card in response.data.cards) {
					cardsInDeck.push(response.data.cards[card]._id);
				}

				this.setState({ cardsInDeck: cardsInDeck });
			})
			.catch((err) => {
				console.log(`Error getting cards for deck: ${err}`);
			});
	}

	addCard(cardToAdd) {
		axios
			.get('http://localhost:4000/cards/', {
				params: {
					card_name: cardToAdd.name,
				},
			})
			.then((response) => {
				if (response.data.cards.length > 0) {
					// Don't allow the quantity to update by way of the AddCard component,
					// because there is currently no way to update the state of the row from AddCard.
					// this.updateCard({
					// 	card_id: response.data.cards[0]._id,
					// 	card_qty: response.data.cards[0].card_qty + 1,
					// });
				} else {
					let apiString = 'http://localhost:4000/cards/add';
					let currentCard = {
						deck_id: this.props.deck_id,
						scryfall_id: cardToAdd.id,
						card_qty: 1,
						card_name: cardToAdd.name,
						card_set: cardToAdd.set,
						is_foil: false,
					};

					axios.post(apiString, currentCard).then((response) => {
						this.setState({
							cardsInDeck: [
								...this.state.cardsInDeck,
								response.data.card_id,
							],
						});
					});
				}
			})
			.catch((err) => {
				console.log(`Error checking for existing cards: ${err}`);
			});
	}

	deleteCard(id) {
		this.setState({
			cardsInDeck: this.state.cardsInDeck.filter((card) => card !== id),
		});
	}

	updateCard(updatedCard) {
		let apiString =
			'http://localhost:4000/cards/update/' + updatedCard.card_id;

		axios
			.post(apiString, updatedCard)
			.then((response) => {
				// console.log('Card update response', response);
				this.getCardsInDeck();
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

	render() {
		if (this.state.is_loading) {
			return <div>"Loading..."</div>;
		}
		return (
			<div>
				<Table bordered striped hover size='sm'>
					<thead>
						<tr>
							<th className='center-column'>
								<AddCard
									deck_id={this.props.deck_id}
									addCard={this.addCard}
								/>
							</th>
							<th>Name</th>
							<th className='center-column'>Set</th>
							<th className='center-column'>Foil</th>
							<th className='center-column'>CMC</th>
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
