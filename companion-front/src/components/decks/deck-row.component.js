import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class DeckRow extends Component {
    constructor(props) {
        super(props);
        
        this.deleteDeck = this.deleteDeck.bind(this);
    }

    deleteDeck() {
        axios.delete(`http://localhost:4000/decks/delete/${this.props.deck._id}`)
            .then(response => {
                console.log("Deck deleted");
            })
            .catch(err => {
                console.log(`Error deleting deck: ${err}`);
            });
    }

    render() {
        return (
            <tr>
                <td>
                    <Link to={`/cards/${this.props.deck._id}`}>
                        {this.props.deck.deck_name}
                    </Link>
                </td>
                <td>{this.props.deck.deck_colors}</td>
                <td>{this.props.deck.deck_count}</td>
                <td>{this.props.deck.deck_average_cmc}</td>
                <td>{this.props.deck.deck_foils}</td>
                <td>{this.props.deck.deck_theme}</td>
                <td>{this.props.deck.deck_sleeve_color}</td>
                <td>{this.props.deck.deck_basic_lands}</td>
                <td>
                    <Link to={`/edit/${this.props.deck._id}`}>
                        <Button size="sm" variant="warning">Pencil icon here</Button>
                    </Link>
                </td>
                <td>
                    <Button onClick={this.deleteDeck} size="sm" variant="danger">Trash icon here</Button>
                </td>
            </tr>
        );
    }
}

export default DeckRow;
