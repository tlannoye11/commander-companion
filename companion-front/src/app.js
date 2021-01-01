import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import DecksList from './components/decks/DecksList.component';
// import Deck from './components/decks/Deck.component';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import DeckScreen from './screens/DeckScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import CardScreen from './screens/CardScreen';

const App = () => {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/decks/:deckId' component={DeckScreen} exact />
                    <Route
                        path='/decks/:deckId/cards'
                        component={CardScreen}
                        exact
                    />
                    <Route
                        path='/decks/:deckId/cards/:cardId'
                        component={CardScreen}
                        exact
                    />
                    <Route path='/' exact component={HomeScreen} />
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
