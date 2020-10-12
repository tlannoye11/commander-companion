import React, { Component } from 'react';
import axios from 'axios';
import { Button, ListGroup, Modal } from 'react-bootstrap';

class AddCard extends Component {
	constructor(props) {
		super(props);

		// Bindings
		this.addToDeck = this.addToDeck.bind(this);
		this.onChangeCardSearch = this.onChangeCardSearch.bind(this);

		// Empty state
		this.state = {
			cards: [],
			deck_id: '',
			selectedCard: '',
			show: false,
		};
	}

	addToDeck = (card) => {
		let apiString = 'http://localhost:4000/cards/add';
		let currentCard = {
			deck_id: this.props.deck_id,
			scryfall_id: card.id,
			card_set: card.set,
			is_foil: false,
		};

		console.log('adding this card to deck', currentCard);

		axios.post(apiString, currentCard).then((response) => {
			console.log(response.data);
		});
	};

	handleAddCard = () => {
		this.setState({
			show: true,
		});
	};

	handleClose = () => {
		this.setState({
			show: false,
		});
	};

	findCards(str) {
		axios
			.get(`https://api.scryfall.com/cards/search?q=name%3D${str}`)
			.then((response) => {
				return response.data.data;
			})
			.then((data) => {
				this.setState({
					cards: data,
				});
			})
			.catch((err) => {
				console.log(`Error getting list of cards: ${err}`);
			});
	}

	onChangeCardSearch(e) {
		if (e.target.value.length >= 3) {
			console.log('searching for', e.target.value);
			this.findCards(e.target.value);
		}
	}

	showCardResults() {
		if (this.state.cards.length >= 3) {
			return this.state.cards.map((card, i) => {
				return (
					<ListGroup.Item
						key={i}
						action
						onClick={() => {
							this.addToDeck(card);
						}}>
						{card.name}
					</ListGroup.Item>
				);
			});
		}
	}

	render() {
		return (
			<div>
				<Button size='sm' variant='info' onClick={this.handleAddCard}>
					Add card to deck
				</Button>

				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>
							Add card:{' '}
							<input
								type='text'
								id='cardSearch'
								onChange={this.onChangeCardSearch}
							/>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div id='cardNames'>
							<ListGroup variant='flush'>
								{this.showCardResults()}
							</ListGroup>
						</div>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

export default AddCard;
