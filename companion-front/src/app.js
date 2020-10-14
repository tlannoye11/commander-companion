import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import DecksList from './components/decks/DecksList.component';
import Deck from './components/decks/Deck.component';

class App extends Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Route path='/' exact component={DecksList} />
					<Route
						path='/edit/:id'
						exact
						render={(props) => (
							<Deck {...props} deck_id={this.props.id} />
						)}
					/>
					<Route
						path='/create'
						exact
						render={(props) => <Deck {...props} />}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
