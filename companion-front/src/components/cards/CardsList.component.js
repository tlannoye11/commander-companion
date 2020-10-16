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

		// Empty state
		this.state = {
			cardsInDeck: [],
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:4000/cards/', {
				params: {
					deck_id: this.props.deck_id,
				},
			})
			.then((response) => {
				let cardsInDeck = [];

				for (let card in response.data) {
					cardsInDeck.push(response.data[card]._id);
				}

				this.setState({ cardsInDeck: cardsInDeck });
			})
			.catch((err) => {
				console.log(`Error getting cards for deck: ${err}`);
			});
	}

	addCard(id) {
		this.setState({
			cardsInDeck: [...this.state.cardsInDeck, id],
		});
	}

	deleteCard(id) {
		this.setState({
			cardsInDeck: this.state.cardsInDeck.filter((card) => card !== id),
		});
	}

	showCardList() {
		return this.state.cardsInDeck.map((currentCard, i) => {
			return (
				<CardRow
					card_id={currentCard}
					key={i}
					onDelete={this.deleteCard}
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
				<Table striped size='sm'>
					<thead>
						<tr>
							<th>
								<AddCard
									deck_id={this.props.deck_id}
									addCard={this.addCard}
								/>
							</th>
							<th>Name</th>
							<th className='center-column'>Set</th>
							<th className='center-column'>Foil</th>
							<th className='center-column'>CMC</th>
							<th>Ramp</th>
							<th>Draw</th>
							<th>Tutor</th>
							<th>Recur</th>
							<th>Removal</th>
							<th>Wraths</th>
							<th>
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
