import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import CardTypeDropdown from './CardTypeDropdown.component';
import CardSetDropdown from './CardSetDropdown.component';

class CardRow extends Component {
	constructor(props) {
		super(props);

		// Bindings
		this.deleteCard = this.deleteCard.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleQtyChange = this.handleQtyChange.bind(this);

		// Empty state
		this.state = {
			is_loading: true,
			deck_id: '',
			scryfall_id: '',
			card_qty: 0,
			card_name: '',
			card_type: '',
			card_set: '',
			is_foil: false,
			card_cmc: 0,
			is_commander: false,
		};
	}

	componentDidMount() {
		this.getCardInfo();
	}

	getCardInfo() {
		axios
			.get('http://localhost:4000/cards/', {
				params: {
					card_id: this.props.card_id,
				},
			})
			.then((response) => {
				this.setState({
					deck_id: response.data.cards[0].deck_id,
					scryfall_id: response.data.cards[0].scryfall_id,
					card_qty: response.data.cards[0].card_qty,
					card_name: response.data.cards[0].card_name,
					card_type: response.data.cards[0].card_type,
					card_set: response.data.cards[0].card_set,
					is_foil: response.data.cards[0].is_foil,
					card_cmc: response.data.cards[0].card_cmc,
					is_commander: response.data.cards[0].is_commander,
					is_loading: false,
				});
			})
			.catch((err) => {
				console.log(`Error getting card from deck: ${err}`);
			});
	}

	// Need a separate delete method here in order to use it in the render method below.
	deleteCard() {
		this.props.deleteCard(this.props.card_id);
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

	handleQtyChange(newQty) {
		this.setState({ card_qty: newQty });
		let currentCard = {
			card_id: this.props.card_id,
			card_qty: newQty,
		};

		if (newQty === 0) {
			this.deleteCard();
		} else {
			this.props.updateCard(currentCard);
		}
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
					<NumericInput
						min={0}
						max={100}
						value={this.state.card_qty}
						onChange={this.handleQtyChange}
					/>
				</td>
				<td>
					<span className='align-middle'>
						<strong>{this.state.card_name}</strong>{' '}
						{this.props.card_id}
					</span>
				</td>
				<td className='center-column'>
					<CardTypeDropdown
						card_id={this.props.card_id}
						card_type={this.state.card_type}
						updateCard={this.props.updateCard}></CardTypeDropdown>
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
					<input
						name='is_commander'
						type='checkbox'
						checked={this.state.is_commander}
						onChange={this.handleInputChange}
					/>
				</td>
				<td className='center-column'>
					<Button
						name='deleteCard'
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
