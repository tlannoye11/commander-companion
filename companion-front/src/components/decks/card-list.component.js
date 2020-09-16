import React, { Component } from 'react';

class CardList extends Component {
    render() {
        return (
            <ul>
                {this.props.cards.map((card) => {
                    return <li key={card.id}>{card.name}</li>
                })}
            </ul>
        );
    }
}

export default CardList;
