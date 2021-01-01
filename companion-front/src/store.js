import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    cardListReducer,
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
} from './reducers/scryfallReducers';
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
    cardList: cardListReducer,
    cardDetails: cardDetailsReducer,
    cardDelete: cardDeleteReducer,
    cardCreate: cardCreateReducer,
    cardUpdate: cardUpdateReducer,
    scryfallCard: scryfallCardReducer,
    scryfallList: scryfallListReducer,
    scryfallEditions: scryfallEditionsReducer,
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
