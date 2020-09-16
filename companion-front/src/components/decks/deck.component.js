import React, { Component } from "react";
import DeckHeader from "./deck-header.component";
import CardsList from "../cards/cards-list.component";
import AddCard from "../cards/add-card.component";

class Deck extends Component {
	isCreated() {
		return this.props.match.params.id ? (
			<div>
				<CardsList deck_id={this.props.match.params.id} />
				<AddCard deck_id={this.props.match.params.id} />
			</div>
		) : (
			""
		);
	}

	render() {
		return (
			<div>
				<DeckHeader
					title={this.props.title}
					deck_id={this.props.match.params.id}
				/>
				{this.isCreated()}
			</div>
		);
	}
}

export default Deck;
