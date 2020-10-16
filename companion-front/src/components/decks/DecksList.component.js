import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import DeckRow from './DeckRow.component';

class DecksList extends Component {
	constructor(props) {
		super(props);

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
		axios
			.get('http://localhost:4000/decks')
			.then((response) => {
				this.setState({ decks: response.data });
			})
			.catch((err) => {
				console.log(`Error getting list of decks: ${err}`);
			});
	}

	showDecksList() {
		return this.state.decks.map((currentDeck, i) => {
			return <DeckRow deck={currentDeck} key={i} />;
		});
	}

	render() {
		return (
			<div>
				<h3>My Deck Box</h3>
				<table
					className='table table-striped'
					style={{ marginTop: 20 }}>
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
							<th>Avg CMC</th>
							<th>Foils</th>
							<th>Theme</th>
							<th>Sleeves</th>
							<th>Basic Lands</th>
						</tr>
					</thead>
					<tbody>{this.showDecksList()}</tbody>
				</table>
			</div>
		);
	}
}

export default DecksList;
