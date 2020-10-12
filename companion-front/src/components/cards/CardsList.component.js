import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CardRow from './card-row.component';
import axios from 'axios';

class CardsList extends Component {
    constructor(props) {
        super(props);

        // Binding

        // Empty state
        this.state = { cardsInDeck: [] };
    }

    componentDidMount() {
        axios
            .get('http://localhost:4000/cards/', {
                params: {
                    deck_id: this.props.deck_id
                }
            })
            .then(response => {
                let cardsInDeck = [];
                
                for (let card in response.data) {
                    cardsInDeck.push(response.data[card]._id);
                }

                this.setState({ cardsInDeck: cardsInDeck });
            })
            .catch((err) => {
                console.log(`Error getting cards for deck: ${err}`);
            });
    }

    showCardList() {
        return this.state.cardsInDeck.map((currentCard, i) => {
            return <CardRow card_id={currentCard} key={i} />;
        });
    }

    render() {
		if (this.state.is_loading) {
			return <div>"Loading..."</div>;
		}
        return (
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Set</th>
                            <th>Foil</th>
                            <th>CMC</th>
                            <th>Ramp</th>
                            <th>Draw</th>
                            <th>Tutor</th>
                            <th>Recur</th>
                            <th>Removal</th>
                            <th>Wraths</th>
                            <th>
                                <Link to="/create">
                                    <Button size="sm" variant="info">Add Tag</Button>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.showCardList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CardsList;
