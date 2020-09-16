import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CardRow from './card-row.component';

class CardsList extends Component {
    constructor(props) {
        super(props);

        // Binding

        // Empty state
        this.state = { cards: [] };
    }

    componentDidMount() {
        // Retrieve list of cards in the deck.
    }

    showCardList() {
        return this.state.cards.map((currentCard, i) => {
            return <CardRow card={currentCard} deck_id={this.props.deck_id} key={i} />;
        });
    }

    render() {
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
