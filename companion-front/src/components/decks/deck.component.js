import React, { Component } from 'react';
import axios from 'axios';
import DeckHeader from './DeckHeader.component';
import CardsList from '../cards/CardsList.component';

class Deck extends Component {
	constructor(props) {
		super(props);

		// Bindings
		this.onChangeDeckName = this.onChangeDeckName.bind(this);
		this.onChangeDeckTheme = this.onChangeDeckTheme.bind(this);
		this.onChangeDeckSleeveColor = this.onChangeDeckSleeveColor.bind(this);
		this.onSubmitHeader = this.onSubmitHeader.bind(this);

		// Empty state
		this.state = {
			deck_id: '',
			deck_name: '',
			deck_theme: '',
			deck_sleeve_color: '',
			deck_header_changes: false,
		};
	}

	componentDidMount() {
		console.log('deck loading', this.props);
		// If this deck already exists, load its contents.
		if (this.props.match.params.id) {
			this.setState({
				deck_id: this.props.match.params.id,
			});

			axios
				.get('http://localhost:4000/decks/', {
					params: {
						deck_id: this.props.match.params.id,
					},
				})
				.then((response) => {
					console.log('deck loading response', response.data);
					this.setState({
						deck_name: response.data.decks[0].deck_name,
						deck_theme: response.data.decks[0].deck_theme,
						deck_sleeve_color:
							response.data.decks[0].deck_sleeve_color,
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
