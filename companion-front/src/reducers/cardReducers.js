import {
	CARDS_IN_DECK_REQUEST,
	CARDS_IN_DECK_SUCCESS,
	CARDS_IN_DECK_FAIL,
	CARD_DETAILS_REQUEST,
	CARD_DETAILS_SUCCESS,
	CARD_DETAILS_FAIL,
	CARD_DETAILS_RESET,
	CARD_DELETE_REQUEST,
	CARD_DELETE_SUCCESS,
	CARD_DELETE_FAIL,
	CARD_CREATE_RESET,
	CARD_CREATE_FAIL,
	CARD_CREATE_SUCCESS,
	CARD_CREATE_REQUEST,
	CARD_UPDATE_REQUEST,
	CARD_UPDATE_SUCCESS,
	CARD_UPDATE_FAIL,
	CARD_UPDATE_RESET,
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

export const cardDetailsReducer = (state = { card: {} }, action) => {
	switch (action.type) {
		case CARD_DETAILS_REQUEST:
			return { loading: true, ...state };
		case CARD_DETAILS_SUCCESS:
			return { loading: false, card: action.payload };
		case CARD_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case CARD_DETAILS_RESET:
			return { card: {} };
		default:
			return state;
	}
};

export const cardDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case CARD_DELETE_REQUEST:
			return { loading: true };
		case CARD_DELETE_SUCCESS:
			return { loading: false, success: true };
		case CARD_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const cardCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CARD_CREATE_REQUEST:
			return { loading: true };
		case CARD_CREATE_SUCCESS:
			return { loading: false, success: true, card: action.payload };
		case CARD_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case CARD_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const cardUpdateReducer = (state = { card: {} }, action) => {
	switch (action.type) {
		case CARD_UPDATE_REQUEST:
			return { loading: true };
		case CARD_UPDATE_SUCCESS:
			return { loading: false, success: true, card: action.payload };
		case CARD_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case CARD_UPDATE_RESET:
			return { card: {} };
		default:
			return state;
	}
};
