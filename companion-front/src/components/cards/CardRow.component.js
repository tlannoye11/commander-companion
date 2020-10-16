import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import CardSetDropdown from './CardSetDropdown.component';

class CardRow extends Component {
	constructor(props) {
		super(props);

		// Bindings
		this.deleteCard = this.deleteCard.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		// Empty state
		this.state = {
			is_loading: true,
			card_id: '',
			deck_id: '',
			scryfall_id: '',
			card_qty: 0,
			card_name: '',
			card_type: '',
			card_set: '',
			is_foil: false,
			card_cmc: 0,
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:4000/cards/', {
				params: {
					card_id: this.props.card_id,
				},
			})
			.then((response) => {
				this.setState({
					card_id: response.data.cards[0].card_id,
					deck_id: response.data.cards[0].deck_id,
					scryfall_id: response.data.cards[0].scryfall_id,
					card_qty: response.data.cards[0].card_qty,
					card_name: response.data.cards[0].card_name,
					is_foil: response.data.cards[0].is_foil,
				});

				axios
					.get(
						`https://api.scryfall.com/cards/${this.state.scryfall_id}`
					)
					.then((response) => {
						this.setState({
							card_type: response.data.type_line,
							card_set: response.data.set,
							card_cmc: response.data.cmc,
							is_loading: false,
						});
					})
					.catch((err) => {
						console.log(
							`Error getting card by Scryfall ID: ${err}`
						);
					});
			})
			.catch((err) => {
				console.log(`Error getting card from deck: ${err}`);
			});
	}

	deleteCard() {
		axios
			.delete(`http://localhost:4000/cards/delete/${this.props.card_id}`)
			.then((response) => {
				this.props.deleteCard(this.props.card_id);
			})
			.catch((err) => {
				console.log(`Error deleting card: ${err}`);
			});
	}

	handleInputChange(e) {
		const target = e.target;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});

		let currentCard = {
			card_id: this.props.card_id,
			[name]: value,
		};

		this.props.updateCard(currentCard);
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
				<td className='center-column'>
					<span>{this.state.card_qty}</span>
				</td>
				<td>
					<span className='align-middle'>
						<strong>{this.state.card_name}</strong>{' '}
						{this.props.card_id}
					</span>
				</td>
				<td className='center-column'>
					<CardSetDropdown
						card_id={this.props.card_id}
						card_name={this.state.card_name}
						card_set={this.state.card_set}
						updateCard={this.props.updateCard}></CardSetDropdown>
				</td>
				<td className='center-column'>
					<input
						name='is_foil'
						type='checkbox'
						checked={this.state.is_foil}
						onChange={this.handleInputChange}
					/>
				</td>
				<td className='center-column'>
					<span>{this.state.card_cmc}</span>
				</td>
				<td className='center-column'>
					<Button
						className='btn btn-small'
						onClick={this.deleteCard}
						size='sm'>
						<i className='fas fa-trash-alt'></i>
					</Button>
				</td>
			</tr>
		);
	}
}

export default CardRow;
