import React, { Component } from 'react';
import axios from 'axios';
import { Button, ListGroup, Modal } from 'react-bootstrap';

class AddCard extends Component {
	constructor(props) {
		super(props);

		// Bindings
		this.onChangeCardSearch = this.onChangeCardSearch.bind(this);

		// Empty state
		this.state = {
			cardNames: [],
			deck_id: '',
			selectedCard: '',
			show: false,
		};
	}

	handleAddCard = () => {
		this.setState({
			cardNames: [],
			show: true,
		});
	};

	handleClose = () => {
		this.setState({
			cardNames: [],
			show: false,
		});
	};

	findCards(str) {
		axios
			//.get(`https://api.scryfall.com/cards/search?q=name%3D${str}`)
			.get(`https://api.scryfall.com/cards/autocomplete?q=${str}`)
			.then((response) => {
				this.setState({
					cardNames:
						response.data.data.length < 5
							? response.data.data
							: response.data.data.slice(0, 5),
				});
			})
			.catch((err) => {
				console.log(`Error getting list of card names: ${err}`);
			});
	}

	onChangeCardSearch(e) {
		if (e.target.value.length >= 3) {
			this.findCards(e.target.value);
		}
	}

	showCardResults() {
		return this.state.cardNames.map((card, i) => {
			return (
				<ListGroup.Item
					key={i}
					action
					// disabled={existingCards.includes(card)}
					onClick={() => {
						this.props.addCard(card);
					}}>
					{card}
				</ListGroup.Item>
			);
		});
	}

	render() {
		return (
			<div>
				<Button size='sm' variant='info' onClick={this.handleAddCard}>
					<i className='fas fa-plus'></i>
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
