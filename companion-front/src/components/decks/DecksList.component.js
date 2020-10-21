import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import DeckRow from './DeckRow.component';

class DecksList extends Component {
	constructor(props) {
		super(props);

		// Binding
		this.deleteDeck = this.deleteDeck.bind(this);

		// Empty state
		this.state = {
			decks: [],
		};
	}

	componentDidMount() {
		// Need to generate list of decks here when the page loads.
		this.getDeckList();
	}

	getDeckList() {
		this.setState({ decks: [] });
		axios
			.get('http://localhost:4000/decks')
			.then((response) => {
				let decks = [];

				for (let deck in response.data.decks) {
					decks.push(response.data.decks[deck]._id);
				}

				this.setState({ decks: decks });
			})
			.catch((err) => {
				console.log(`Error getting list of decks: ${err}`);
			});
	}

	deleteDeck(id) {
		axios
			.delete(`http://localhost:4000/decks/delete/${id}`)
			.then((response) => {
				this.getDeckList();
			})
			.catch((err) => {
				console.log(`Error deleting deck: ${err}`);
			});
	}

	showDecksList() {
		return this.state.decks.map((currentDeck, i) => {
			return (
				<DeckRow
					deck_id={currentDeck}
					key={i}
					deleteDeck={this.deleteDeck}
					updateCard={this.updateCard}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<h3>My Deck Box</h3>
				<Table bordered striped hover size='sm'>
					<thead>
						<tr>
							<th>
								<Link to='/create'>
									<Button size='sm' variant='info'>
										<i className='fas fa-plus'></i>
									</Button>
								</Link>
							</th>
							<th>Name</th>
							<th>Colors</th>
							<th>Count</th>
							<th>Foils</th>
							<th>Avg CMC</th>
							<th>Theme</th>
							<th>Sleeves</th>
							<th>Basic Lands</th>
						</tr>
					</thead>
					<tbody>{this.showDecksList()}</tbody>
				</Table>
			</div>
		);
	}
}

export default DecksList;
