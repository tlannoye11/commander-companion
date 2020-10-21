import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class DeckRow extends Component {
	constructor(props) {
		super(props);

		// Binding
		this.deleteDeck = this.deleteDeck.bind(this);

		// Empty state
		this.state = {
			is_loading: true,
			deck_name: '',
			deck_sleeve_color: '',
			deck_theme: '',
		};
	}

	componentDidMount() {
		this.getDeckInfo();
	}

	getDeckInfo() {
		axios
			.get('http://localhost:4000/decks/', {
				params: {
					deck_id: this.props.deck_id,
				},
			})
			.then((response) => {
				this.setState({
					deck_name: response.data.decks[0].deck_name,
					deck_sleeve_color: response.data.decks[0].deck_sleeve_color,
					deck_theme: response.data.decks[0].deck_theme,
					is_loading: false,
				});
			})
			.catch((err) => {
				console.log(`Error getting deck info: ${err}`);
			});
	}

	deleteDeck() {
		this.props.deleteDeck(this.props.deck_id);
	}

	render() {
		if (this.state.is_loading) {
			return (
				<tr>
					<td>Loading...</td>
				</tr>
			);
		}
		return (
			<tr>
				<td></td>
				<td>
					<Link to={`/edit/${this.props.deck_id}`}>
						<strong>{this.state.deck_name}</strong>{' '}
					</Link>
					{this.props.deck_id}
				</td>
				{/* <td>{this.props.deck.deck_colors}</td>
				<td>{this.props.deck.deck_count}</td>
				<td>{this.props.deck.deck_average_cmc}</td>
				<td>{this.props.deck.deck_foils}</td> */}
				<td>{this.state.deck_theme}</td>
				<td>{this.state.deck_sleeve_color}</td>
				{/* <td>{this.props.deck.deck_basic_lands}</td> */}
				<td>
					<Button onClick={this.deleteDeck} size='sm'>
						<i className='fas fa-trash-alt'></i>
					</Button>
				</td>
			</tr>
		);
	}
}

export default DeckRow;
