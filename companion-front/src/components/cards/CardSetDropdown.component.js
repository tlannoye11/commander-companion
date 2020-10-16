import React, { Component } from 'react';
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class CardSetDropdown extends Component {
	constructor(props) {
		super(props);

		// Bindings
		this.handleSetDropDownSelect = this.handleSetDropDownSelect.bind(this);

		// Empty state
		this.state = {
			is_loading: true,
			card_set: '',
			sets: [],
		};
	}

	componentDidMount() {
		this.setState({
			card_set: this.props.card_set,
		});

		axios
			.get(
				`https://api.scryfall.com/cards/search?q="${this.props.card_name}"&unique=prints`
			)
			.then((response) => {
				let sets = [];
				for (let card in response.data.data) {
					let currentSet = [];
					currentSet.push(response.data.data[card].set.toUpperCase());
					currentSet.push(response.data.data[card].id);
					currentSet.push(response.data.data[card].set_name);
					sets.push(currentSet);
				}

				this.setState({
					is_loading: false,
					sets: sets,
				});
			})
			.catch((err) => {
				console.log(
					`Error getting sets for card ${this.props.card_name}: ${err}`
				);
			});
	}

	createCardSetDropDown() {
		return this.state.sets.map((set, i) => {
			return (
				<Dropdown.Item id={set[1]} eventKey={set[0]} key={i}>
					{set[2]}
				</Dropdown.Item>
			);
		});
	}

	handleSetDropDownSelect(e) {
		this.setState({
			card_set: e,
		});

		let currentCard = {
			card_id: this.props.card_id,
			scryfall_id: this.state.sets.find((set) => set[0] === e)[1],
			card_set: e,
		};

		this.props.updateCard(currentCard);
	}

	render() {
		if (this.state.is_loading) {
			return 'Loading...';
		}

		return (
			<DropdownButton
				id='card-set-dropdown'
				title={this.state.card_set.toUpperCase()}
				size='sm'
				onSelect={this.handleSetDropDownSelect}>
				{this.createCardSetDropDown()}
			</DropdownButton>
		);
	}
}

export default CardSetDropdown;
