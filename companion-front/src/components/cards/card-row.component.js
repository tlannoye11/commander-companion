import React, { Component } from "react";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import 'bootstrap/dist/css/bootstrap.min.css';
class CardRow extends Component {
	constructor(props) {
		super(props);

		// Bindings
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSetDropDownSelect = this.handleSetDropDownSelect.bind(this);

		// Empty state
		this.state = {
			is_loading: true,
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
					card_set: response.data.set, //this.props.card.card_set,
					is_foil: this.props.card.is_foil,
					card_cmc: this.props.card.card_cmc,
				});

				axios
					.get(`https://api.scryfall.com/cards/search?q="${this.state.card_name}"&unique=prints`)
					.then((response) => {
						let sets = [];
						for (let card in response.data.data) {
							sets.push(response.data.data[card].set.toUpperCase());
						}

						this.setState({
							is_loading: false,
							sets: sets
						});
					})
					.catch((err) => {
						console.log(`Error getting sets for card ${this.state.card_name}: ${err}`);
					})
			})
			.catch((err) => {
				console.log(`Error getting card by ID: ${err}`);
			});
	}

	createCardSetDropDown() {
		return this.state.sets.map((set,i) => {
			return <Dropdown.Item eventKey={set} key={i}>{set}</Dropdown.Item>;
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

	handleSetDropDownSelect(e) {
		this.setState({
			card_set: e
		});
	}

	render() {
		if (this.state.is_loading) {
			return (
				<tr>
					<td>"Loading..."</td>
				</tr>
			);
		}

		return (
			<tr>
				<td>{this.state.card_name}</td>
				<td>
					<DropdownButton id="card-set-dropdown" title={this.state.card_set.toUpperCase()} size="sm" onSelect={this.handleSetDropDownSelect}>
						{this.createCardSetDropDown()}
					</DropdownButton>
				</td>
				{/* This will be a drop-down list of all possible sets for this card, with the default being the saved set from the collection.*/}
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
