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
			cards: [],
			deck_id: '',
			selectedCard: '',
			show: false,
		};
	}

	handleAddCard = () => {
		this.setState({
			cards: [],
			show: true,
		});
	};

	handleClose = () => {
		this.setState({
			cards: [],
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
			this.findCards(e.target.value);
		}
	}

	showCardResults() {
		return this.state.cards.map((card, i) => {
			return (
				<ListGroup.Item
					key={i}
					action
					onClick={() => {
						this.props.addCard(card);
					}}>
					{card.name}
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
