import {
    SCRYFALL_CARD_FAIL,
    SCRYFALL_CARD_REQUEST,
    SCRYFALL_CARD_RESET,
    SCRYFALL_CARD_SUCCESS,
    SCRYFALL_EDITIONS_REQUEST,
    SCRYFALL_EDITIONS_SUCCESS,
    SCRYFALL_EDITIONS_FAIL,
    SCRYFALL_EDITIONS_RESET,
    SCRYFALL_LIST_REQUEST,
    SCRYFALL_LIST_SUCCESS,
    SCRYFALL_LIST_FAIL,
    SCRYFALL_LIST_RESET,
    SCRYFALL_NAMED_FAIL,
    SCRYFALL_NAMED_SUCCESS,
    SCRYFALL_NAMED_REQUEST,
    SCRYFALL_NAMED_RESET,
} from '../constants/scryfallConstants';

export const scryfallCardReducer = (state = { card: {} }, action) => {
    switch (action.type) {
        case SCRYFALL_CARD_REQUEST:
            return { loading: true };
        case SCRYFALL_CARD_SUCCESS:
            return { loading: false, scryData: action.payload };
        case SCRYFALL_CARD_FAIL:
            return { loading: false, error: action.payload };
        case SCRYFALL_CARD_RESET:
            return { card: {} };
        default:
            return state;
    }
};

export const scryfallNamedReducer = (state = { card: {} }, action) => {
    switch (action.type) {
        case SCRYFALL_NAMED_REQUEST:
            return { loading: true };
        case SCRYFALL_NAMED_SUCCESS:
            return { loading: false, scryNamed: action.payload };
        case SCRYFALL_NAMED_FAIL:
            return { loading: false, error: action.payload };
        case SCRYFALL_NAMED_RESET:
            return { card: {} };
        default:
            return state;
    }
};

export const scryfallEditionsReducer = (state = { card: {} }, action) => {
    switch (action.type) {
        case SCRYFALL_EDITIONS_REQUEST:
            return { loading: true };
        case SCRYFALL_EDITIONS_SUCCESS:
            return { loading: false, cardEditions: action.payload };
        case SCRYFALL_EDITIONS_FAIL:
            return { loading: false, error: action.payload };
        case SCRYFALL_EDITIONS_RESET:
            return { card: {} };
        default:
            return state;
    }
};

export const scryfallListReducer = (state = { cards: [] }, action) => {
    switch (action.type) {
        case SCRYFALL_LIST_REQUEST:
            return { loading: true };
        case SCRYFALL_LIST_SUCCESS:
            return { loading: false, scryList: action.payload };
        case SCRYFALL_LIST_FAIL:
            return { loading: false, error: action.payload };
        case SCRYFALL_LIST_RESET:
            return { cards: [] };
        default:
            return state;
    }
};
