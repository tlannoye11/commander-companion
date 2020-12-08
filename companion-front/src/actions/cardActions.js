import axios from 'axios';
import {
	CARDS_IN_DECK_FAIL,
	CARDS_IN_DECK_REQUEST,
	CARDS_IN_DECK_SUCCESS,
} from '../constants/cardConstants';

export const getCardsInDeck = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CARDS_IN_DECK_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/cards/deck/${id}`, config);

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
