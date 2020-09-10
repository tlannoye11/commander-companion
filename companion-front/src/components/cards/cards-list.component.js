import React, { Component } from 'react';

class CardsList extends Component {
    constructor(props) {
        super(props);

        // Binding

        // Empty state
        this.state = { cards: [] };
    }

    showCardList() {
        return this.state.cards.map((currentCard, i) => {
            return <CardRow card={currentCard} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>{this.props.deck.deck_name}</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
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
                                    <Button size="sm" variant="info">Plus</Button>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.showDeck() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CardsList;
