import React, { Component } from 'react';
import axios from 'axios';
import DeckHeader from './deck-header.component';
import CardsList from '../cards/cards-list.component';
import AddCard from '../cards/add-card.component';

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
			deck_id: '',
			deck_name: '',
			deck_theme: '',
			deck_sleeve_color: '',
			cards: [],
			deck_header_changes: false,
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
					'http://localhost:4000/decks/' + this.props.match.params.id
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
						.get('http://localhost:4000/cards/', {
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
							console.log(
								`Error getting card list for deck: ${err}`
							);
						});
				})
				.catch((err) => {
					console.log(`Error getting deck information: ${err}`);
				});
		}
	}

	// Pass onChangeCards to CardList component here, once implemented.
	isCreated() {
		return this.state.deck_id ? (
			<div>
				<CardsList deck_id={this.state.deck_id} />
				<AddCard deck_id={this.state.deck_id} />
			</div>
		) : (
			''
		);
	}

	// onChange methods
	onChangeDeckName(e) {
		this.setState({
			deck_name: e.target.value,
			deck_header_changes: true,
		});
	}

	onChangeDeckTheme(e) {
		this.setState({
			deck_theme: e.target.value,
			deck_header_changes: true,
		});
	}

	onChangeDeckSleeveColor(e) {
		this.setState({
			deck_sleeve_color: e.target.value,
			deck_header_changes: true,
		});
	}

	onChangeCards(e) {
		// Not yet implemented
		console.log('Change cards:', e.target.value);
		this.setState({
			deck_header_changes: true,
		});
	}

	onSubmitHeader(e) {
		e.preventDefault();

		let apiString =
			'http://localhost:4000/decks/' +
			(this.state.deck_id ? 'update/' + this.state.deck_id : 'add');
		let currentDeck = {
			deck_name: this.state.deck_name,
			deck_theme: this.state.deck_theme,
			deck_sleeve_color: this.state.deck_sleeve_color,
		};

		console.log('api,deck');
		console.log(apiString);
		console.log(currentDeck);

		axios.post(apiString, currentDeck).then((response) => {
			this.setState({ deck_header_changes: false });

			if (response.data.id) {
				this.setState({ deck_id: response.data.id });
			}

			console.log(response.data);
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
					deck_header_changes={this.state.deck_header_changes}
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
