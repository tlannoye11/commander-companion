import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import DeckRow from './deck-row.component';

class DecksList extends Component {
    constructor(props) {
        super(props);

        // Empty state
        this.state = {
            decks: []
        };
    }

    getDeckList() {
        axios
            .get('http://localhost:4000/decks')
            .then(response => {
                this.setState({ decks: response.data });
            })
            .catch((err) => {
                console.log(`Error getting list of decks: ${err}`);
            });
    }

    componentDidMount() {
        // Need to generate list of decks here when the page loads.
        this.getDeckList();
    }

    showDecksList() {
        return this.state.decks.map((currentDeck, i) => {
            return <DeckRow deck={currentDeck} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>List of Decks</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Colors</th>
                            <th>Count</th>
                            <th>Avg CMC</th>
                            <th>Foils</th>
                            <th>Theme</th>
                            <th>Sleeves</th>
                            <th>Basic Lands</th>
                            <th>
                                <Link to="/create">
                                    <Button size="sm" variant="info">Plus sign here</Button>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.showDecksList() }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DecksList;
