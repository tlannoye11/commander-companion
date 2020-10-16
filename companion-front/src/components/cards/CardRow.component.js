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
		this.updateCardRow = this.updateCardRow.bind(this);

		// Empty state
		this.state = {
			is_loading: true,
			card_id: '',
			deck_id: '',
			scryfall_id: '',
			card_type: '',
			card_set: '',
			is_foil: false,
			card_cmc: 0,
		};
	}

	componentDidMount() {
		this.setState({
			card_id: this.props.card_id,
		});

		axios
			.get('http://localhost:4000/cards/', {
				params: {
					card_id: this.props.card_id,
				},
			})
			.then((response) => {
				this.setState({
					deck_id: response.data[0].deck_id,
					scryfall_id: response.data[0].scryfall_id,
					is_foil: response.data[0].is_foil,
				});

				axios
					.get(
						`https://api.scryfall.com/cards/${this.state.scryfall_id}`
					)
					.then((response) => {
						this.setState({
							card_name: response.data.name,
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
			.delete(`http://localhost:4000/cards/delete/${this.state.card_id}`)
			.then((response) => {
				console.log('Card deleted');
				this.props.onDelete(this.state.card_id);
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
			[name]: value,
		};

		this.updateCardRow(currentCard);
	}

	updateCardRow(updatedCardRow) {
		let apiString =
			'http://localhost:4000/cards/update/' + this.state.card_id;

		axios
			.post(apiString, updatedCardRow)
			.then((response) => {
				// console.log('Card update response', response);
			})
			.catch((err) => {
				console.log('Error updating deck', err);

				if (err.response) {
					console.log('Error response data', err.response.data);
					console.log('Error response headers', err.response.headers);
					console.log('Error response config', err.response.config);
				} else if (err.request) {
					console.log('Error request', err.request);
				}
			});
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
				<td>
					<span>{this.state.card_qty}</span>
				</td>
				<td>
					<span className='align-middle'>{this.state.card_name}</span>
				</td>
				<td className='center-column'>
					<CardSetDropdown
						card_id={this.state.card_id}
						card_name={this.state.card_name}
						card_set={this.state.card_set}
						updateCardRow={this.updateCardRow}></CardSetDropdown>
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
				<td>
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
