import React, { Component } from "react";
import axios from "axios";
import { Button, ListGroup, Modal } from "react-bootstrap";

class AddCard extends Component {
	constructor(props) {
		super(props);

		// Bindings
		this.onChangeCardSearch = this.onChangeCardSearch.bind(this);

		// Empty state
		this.state = {
			cards: [],
			selectedCard: "",
			show: false,
		};
	}

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
			this.findCards(e.target.value);
		}
    }

	showCardResults() {
		if (this.state.cards.length >= 3) {
			return this.state.cards.map((card, i) => {
				return (
					<ListGroup.Item
						key={i}
						onClick={() => {
                            console.log("YOU CHOSE",card.id);
                            // do something with this choice!
                        }}
					>
						{card.name}
					</ListGroup.Item>
				);
			});
		}
	}

	render() {
		return (
			<div>
				<Button size="sm" variant="info" onClick={this.handleAddCard}>
					Add card to deck
				</Button>

				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>
							Add card:{" "}
							<input
								type="text"
								id="cardSearch"
								onChange={this.onChangeCardSearch}
							/>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div id="cardNames">
							<ListGroup variant="flush">
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
