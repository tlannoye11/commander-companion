import React, { Component } from "react";
import axios from "axios";

class CardRow extends Component {
	constructor(props) {
		super(props);

		// Bindings
		this.handleInputChange = this.handleInputChange.bind(this);

		// Empty state
		this.state = {
			deck_id: "",
			card_id: "",
			card_set: "",
			is_foil: false,
			card_cmc: 0,
		};
	}

	componentDidMount() {
		axios
			.get(`https://api.scryfall.com/cards/${this.props.card.card_id}`)
			.then((response) => {
				this.setState({
					deck_id: this.props.card.deck_id,
					card_id: this.props.card.card_id,
					card_name: response.data.name,
					card_set: this.props.card.card_set,
					is_foil: this.props.card.is_foil,
					card_cmc: this.props.card.card_cmc,
				});
			})
			.catch((err) => {
				console.log(`Error getting card by ID: ${err}`);
			});
	}

	handleInputChange(e) {
		const target = e.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	render() {
		return (
			<tr>
				<td>{this.state.card_name}</td>
				<td>{this.state.card_set}</td>
				<td>
					<input
                        name="is_foil"
						type="checkbox"
						checked={this.state.is_foil}
						onChange={this.handleInputChange}
					/>
				</td>
			</tr>
		);
	}
}

export default CardRow;
