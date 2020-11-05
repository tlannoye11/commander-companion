import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import DecksList from './components/decks/DecksList.component';
import Deck from './components/decks/Deck.component';

import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
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
					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/' exact component={DecksList} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
