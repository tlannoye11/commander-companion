import {
	CARDS_IN_DECK_REQUEST,
	CARDS_IN_DECK_SUCCESS,
	CARDS_IN_DECK_FAIL,
} from '../constants/cardConstants';

export const cardsInDeckReducer = (state = { cards: [] }, action) => {
	switch (action.type) {
		case CARDS_IN_DECK_REQUEST:
			return { loading: true, cards: [] };
		case CARDS_IN_DECK_SUCCESS:
			return { loading: false, cards: action.payload };
		case CARDS_IN_DECK_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
