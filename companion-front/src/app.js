import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateDeck from './components/decks/create-deck.component';
import DecksList from './components/decks/decks-list.component';
import EditDeck from './components/decks/edit-deck.component';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Route path="/" exact component={DecksList} />
                    <Route path="/edit/:id" exact component={EditDeck} />
                    <Route path="/create" exact component={CreateDeck} />
                </div>
            </Router>
        );
    }
}

export default App;
