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

				axios
					.get('http://localhost:4000/cards/', {
						params: {
							deck_id: this.props.deck_id,
						},
					})
					.then((response) => {
						this.getDeckStats(response.data.cards);
					})
					.catch((err) => {
						console.log(`Error getting cards in deck: ${err}`);
					});
			})
			.catch((err) => {
				console.log(`Error getting deck info: ${err}`);
			});
	}

	getDeckStats(cards) {
		let cmc_count = 0;
		let foil_count = 0;
		let land_count = 0;
		let spell_count = 0;

		for (let card in cards) {
			cards[card].card_type === 'L'
				? (land_count += cards[card].card_qty)
				: (spell_count += cards[card].card_qty);

			cmc_count +=
				cards[card].card_type === 'L' ? 0 : cards[card].card_cmc;

			foil_count += cards[card].is_foil ? cards[card].card_qty : 0;
		}

		this.setState({
			avg_cmc: Math.round((cmc_count / spell_count) * 100) / 100 || 0,
			foil_count: foil_count,
			land_count: land_count,
			spell_count: spell_count,
		});
		// console.log(
		// 	`Avg CMC: ${this.state.avg_cmc}, CMC count: ${cmc_count}, Foil count: ${foil_count}, Land count: ${land_count}, Spell count: ${spell_count}, `
		// );
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
				<td>Colors here</td>
				<td className='center-column'>
					{this.state.spell_count + this.state.land_count}
				</td>
				<td className='center-column'>{this.state.foil_count}</td>
				<td className='center-column'>{this.state.avg_cmc}</td>
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
