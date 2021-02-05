import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	cardsInDeckReducer,
	cardDetailsReducer,
	cardDeleteReducer,
	cardCreateReducer,
	cardUpdateReducer,
} from './reducers/cardReducers';
import {
	deckListReducer,
	deckDetailsReducer,
	deckCreateReducer,
	deckDeleteReducer,
	deckUpdateReducer,
} from './reducers/deckReducers';
import {
	scryfallCardReducer,
	scryfallEditionsReducer,
	scryfallListReducer,
	scryfallNamedReducer,
} from './reducers/scryfallReducers';
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
	cardsInDeck: cardsInDeckReducer,
	cardDetails: cardDetailsReducer,
	cardDelete: cardDeleteReducer,
	cardCreate: cardCreateReducer,
	cardUpdate: cardUpdateReducer,
	scryfallCard: scryfallCardReducer,
	scryfallEditions: scryfallEditionsReducer,
	scryfallList: scryfallListReducer,
	scryfallNamed: scryfallNamedReducer,
	deckList: deckListReducer,
	deckDetails: deckDetailsReducer,
	deckDelete: deckDeleteReducer,
	deckCreate: deckCreateReducer,
	deckUpdate: deckUpdateReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
