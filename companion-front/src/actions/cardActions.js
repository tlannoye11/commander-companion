import axios from 'axios';
import {
	CARDS_IN_DECK_FAIL,
	CARDS_IN_DECK_REQUEST,
	CARDS_IN_DECK_SUCCESS,
	CARD_DETAILS_FAIL,
	CARD_DETAILS_REQUEST,
	CARD_DETAILS_SUCCESS,
	CARD_DELETE_REQUEST,
	CARD_DELETE_SUCCESS,
	CARD_DELETE_FAIL,
	CARD_CREATE_REQUEST,
	CARD_CREATE_SUCCESS,
	CARD_CREATE_FAIL,
	CARD_UPDATE_REQUEST,
	CARD_UPDATE_SUCCESS,
	CARD_UPDATE_FAIL,
} from '../constants/cardConstants';

export const getCardsInDeck = (deck = '') => async (dispatch) => {
	try {
		dispatch({
			type: CARDS_IN_DECK_REQUEST,
		});

		const { data } = await axios.get(`/api/cards?deck=${deck}`);

		dispatch({
			type: CARDS_IN_DECK_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CARDS_IN_DECK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getCardDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: CARD_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/cards/${id}`);

		dispatch({
			type: CARD_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CARD_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteCard = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CARD_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/cards/${id}`, config);

		dispatch({
			type: CARD_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: CARD_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createCard = (card) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CARD_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		// console.log('card before create card action', card);

		const { data } = await axios.post(`/api/cards`, card, config);

		// console.log('create card action:', data);

		dispatch({
			type: CARD_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CARD_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createCardByName = (cardName, deckId) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: CARD_CREATE_REQUEST,
		});

		const card = {
			deckId: deckId,
			name: cardName,
		};

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		// console.log('card before create card by name action', card);

		const { data } = await axios.post(`/api/cards`, card, config);

		// console.log('create card by name action:', data);

		dispatch({
			type: CARD_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CARD_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateCard = (card) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CARD_UPDATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/cards/${card._id}`,
			card,
			config
		);

		dispatch({
			type: CARD_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CARD_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
