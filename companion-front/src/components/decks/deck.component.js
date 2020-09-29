import React, { Component } from "react";
import axios from "axios";
import DeckHeader from "./deck-header.component";
import CardsList from "../cards/cards-list.component";
import AddCard from "../cards/add-card.component";

class Deck extends Component {
	constructor(props) {
		super(props);

		// Bindings
		this.onChangeDeckName = this.onChangeDeckName.bind(this);
		this.onChangeDeckTheme = this.onChangeDeckTheme.bind(this);
		this.onChangeDeckSleeveColor = this.onChangeDeckSleeveColor.bind(this);
		this.onChangeCards = this.onChangeCards.bind(this);
		this.onSubmitHeader = this.onSubmitHeader.bind(this);

		// Empty state
		this.state = {
			deck_id: "",
			deck_name: "",
			deck_theme: "",
			deck_sleeve_color: "",
			cards: [],
			changes: false,
		};
	}

	componentDidMount() {
		// If this deck already exists, load its contents.
		if (this.props.match.params.id) {
			this.setState({
				deck_id: this.props.match.params.id,
			});

			axios
				.get(
					"http://localhost:4000/decks/" + this.props.match.params.id
				)
				.then((response) => {
					this.setState({
						deck_name: response.data.deck_name,
						deck_theme: response.data.deck_theme,
						deck_sleeve_color: response.data.deck_sleeve_color,
					});
				})
				.then((response) => {
					axios
						.get("http://localhost:4000/cards/deck/", {
							params: {
								deck_id: this.props.match.params.id,
							},
						})
						.then((response) => {
							// Check for an empty deck list.
							this.setState({
								cards: response.data ? response.data.cards : [],
							});
						})
						.catch((err) => {
							console.log(`Error getting card list: ${err}`);
						});
				})
				.catch((err) => {
					console.log(`Error getting deck information: ${err}`);
				});
		}
	}

	isCreated() {
		return this.state.deck_id ? (
			<div>
				<CardsList deck_id={this.state.deck_id} />
				<AddCard deck_id={this.state.deck_id} />
			</div>
		) : (
			""
		);
	}

	// onChange methods
	onChangeDeckName(e) {
		this.setState({
			deck_name: e.target.value,
			changes: true,
		});
	}

	onChangeDeckTheme(e) {
		this.setState({
			deck_theme: e.target.value,
			changes: true,
		});
	}

	onChangeDeckSleeveColor(e) {
		this.setState({
			deck_sleeve_color: e.target.value,
			changes: true,
		});
	}

	onChangeCards(e) {
		// Not yet implemented
		console.log("E:", e.target.value);
	}

	onSubmitHeader(e) {
		e.preventDefault();

		let apiString =	"http://localhost:4000/decks/" + (this.state.deck_id ? "update/" + this.state.deck_id : "add");

		const currentDeck = {
			deck_name: this.state.deck_name,
			deck_theme: this.state.deck_theme,
			deck_sleeve_color: this.state.deck_sleeve_color,
			cards: this.state.cards,
		};

		axios.post(apiString, currentDeck).then((response) => {
			this.setState({ changes: false });

			if (response.data.id) {
				this.setState({ deck_id: response.data.id });
			}
		});
	}

	render() {
		return (
			<div>
				<DeckHeader
					title={this.state.deck_id ? `Update Deck` : `Create Deck`}
					deck_name={this.state.deck_name}
					deck_theme={this.state.deck_theme}
					deck_sleeve_color={this.state.deck_sleeve_color}
					changes={this.state.changes}
					onChangeDeckName={this.onChangeDeckName}
					onChangeDeckTheme={this.onChangeDeckTheme}
					onChangeDeckSleeveColor={this.onChangeDeckSleeveColor}
					onSubmit={this.onSubmitHeader}
				/>
				{this.isCreated()}
			</div>
		);
	}
}

export default Deck;
