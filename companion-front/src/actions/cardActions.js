import axios from 'axios';
import {
	CARD_LIST_REQUEST,
	CARD_LIST_SUCCESS,
	CARD_LIST_FAIL,
} from '../constants/cardConstants';

export const listCards = () => async (dispatch) => {
	try {
		dispatch({ type: CARD_LIST_REQUEST });
		const { data } = await axios.get('/cards/');

		dispatch({
			type: CARD_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CARD_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
