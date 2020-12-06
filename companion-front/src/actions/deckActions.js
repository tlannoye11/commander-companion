import axios from 'axios';
import {
	DECK_DETAILS_FAIL,
	DECK_DETAILS_REQUEST,
	DECK_DETAILS_SUCCESS,
	DECK_LIST_FAIL,
	DECK_LIST_REQUEST,
	DECK_LIST_SUCCESS,
	DECK_CREATE_FAIL,
	DECK_CREATE_REQUEST,
	DECK_CREATE_SUCCESS,
	DECK_DELETE_REQUEST,
	DECK_DELETE_SUCCESS,
	DECK_DELETE_FAIL,
	DECK_UPDATE_FAIL,
	DECK_UPDATE_SUCCESS,
	DECK_UPDATE_REQUEST,
} from '../constants/deckConstants';

export const listDecks = () => async (dispatch) => {
	try {
		dispatch({ type: DECK_LIST_REQUEST });

		const { data } = await axios.get('/api/decks');

		dispatch({
			type: DECK_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DECK_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getDeckDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: DECK_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/decks/${id}`);

		dispatch({
			type: DECK_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DECK_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteDeck = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DECK_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/decks/${id}`, config);

		dispatch({
			type: DECK_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: DECK_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createDeck = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: DECK_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/decks`, {}, config);

		dispatch({
			type: DECK_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DECK_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateDeck = (deck) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DECK_UPDATE_REQUEST,
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
			`/api/decks/${deck._id}`,
			deck,
			config
		);

		dispatch({
			type: DECK_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DECK_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
