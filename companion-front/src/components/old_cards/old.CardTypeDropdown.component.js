import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class CardTypeDropdown extends Component {
	constructor(props) {
		super(props);

		// Bindings
		this.handleTypeDropdownSelect = this.handleTypeDropdownSelect.bind(
			this
		);

		// Empty state
		this.state = {
			is_loading: true,
			card_type: '',
			types: [],
		};
	}

	componentDidMount() {
		this.setState({
			is_loading: false,
			card_type: this.props.card_type,
			types: ['C', 'P', 'A', 'E', 'I', 'S', 'L', 'B'],
		});
	}

	createCardTypeDropdown() {
		return this.state.types.map((type, i) => {
			return (
				<Dropdown.Item id={type} eventKey={type} key={i}>
					{type}
				</Dropdown.Item>
			);
		});
	}

	handleTypeDropdownSelect(e) {
		this.setState({
			card_type: e,
		});

		let currentCard = {
			card_id: this.props.card_id,
			card_type: e,
		};

		this.props.updateCard(currentCard);
	}

	render() {
		if (this.state.is_loading) {
			return 'Loading...';
		}

		return (
			<DropdownButton
				id='card-type-dropdown'
				title={this.state.card_type}
				size='sm'
				onSelect={this.handleTypeDropdownSelect}>
				{this.createCardTypeDropdown()}
			</DropdownButton>
		);
	}
}

export default CardTypeDropdown;
