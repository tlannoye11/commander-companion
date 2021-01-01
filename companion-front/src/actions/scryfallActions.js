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
} from '../constants/scryfallConstants';

export const getScryfallCard = (name, edition, collectorNumber) => async (
    dispatch
) => {
    try {
        dispatch({
            type: SCRYFALL_CARD_REQUEST,
        });

        const { data } = await axios.get(
            `https://api.scryfall.com/cards/search?q=${name}+set%3A${edition}+number%3A${collectorNumber}`
        );

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

export const getScryfallList = (str) => async (dispatch) => {
    try {
        dispatch({
            type: SCRYFALL_LIST_REQUEST,
        });

        const { data } = await axios.get(
            `https://api.scryfall.com/cards/autocomplete?q=${str}`
        );

        console.log('card list action:', data);

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
            payload: data,
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
