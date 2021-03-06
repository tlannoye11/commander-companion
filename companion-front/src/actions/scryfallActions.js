import axios from 'axios';
import {
	SCRYFALL_CARD_FAIL,
	SCRYFALL_CARD_REQUEST,
	SCRYFALL_CARD_SUCCESS,
	SCRYFALL_EDITIONS_FAIL,
	SCRYFALL_EDITIONS_REQUEST,
	SCRYFALL_EDITIONS_SUCCESS,
	SCRYFALL_LIST_FAIL,
	SCRYFALL_LIST_REQUEST,
	SCRYFALL_LIST_SUCCESS,
	SCRYFALL_NAMED_FAIL,
	SCRYFALL_NAMED_REQUEST,
	SCRYFALL_NAMED_SUCCESS,
} from '../constants/scryfallConstants';

export const getScryfallCard = (name, edition, collectorNumber) => async (
	dispatch
) => {
	try {
		dispatch({
			type: SCRYFALL_CARD_REQUEST,
		});

		const searchString =
			`q=${name}` +
			(edition ? `+set%3A${edition}` : '') +
			(collectorNumber ? `+number%3A${collectorNumber}` : '');

		const { data } = await axios.get(
			`https://api.scryfall.com/cards/search?${searchString}`
		);

		// console.log('get scryfall card action:', data);

		dispatch({
			type: SCRYFALL_CARD_SUCCESS,
			payload: data.data[0],
		});
	} catch (error) {
		dispatch({
			type: SCRYFALL_CARD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getScryfallNamed = (name) => async (dispatch) => {
	try {
		dispatch({
			type: SCRYFALL_NAMED_REQUEST,
		});

		const { data } = await axios.get(
			`https://api.scryfall.com/cards/named?exact=${name}`
		);

		// console.log('get scryfall named action:', data);

		dispatch({
			type: SCRYFALL_NAMED_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SCRYFALL_NAMED_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getScryfallList = (str) => async (dispatch) => {
	try {
		dispatch({
			type: SCRYFALL_LIST_REQUEST,
		});

		const { data } = await axios.get(
			`https://api.scryfall.com/cards/autocomplete?q=${str}`
		);

		// console.log('get scryfall list action:', data);

		dispatch({
			type: SCRYFALL_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SCRYFALL_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getScryfallEditions = (name) => async (dispatch) => {
	try {
		dispatch({
			type: SCRYFALL_EDITIONS_REQUEST,
		});

		const { data } = await axios.get(
			`https://api.scryfall.com/cards/search?q="${name}"&unique=prints`
		);

		// console.log('editions action:', data);

		dispatch({
			type: SCRYFALL_EDITIONS_SUCCESS,
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: SCRYFALL_EDITIONS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
