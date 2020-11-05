import asyncHandler from 'express-async-handler';
import Deck from '../models/deckModel.js';

const getDecks = asyncHandler(async (request, response) => {
	const decks = await Deck.find({});

	response.json(decks);
});

const getDeckById = asyncHandler(async (request, response) => {
	const deck = await Deck.findById(request.params.id);

	if (deck) {
		response.json(deck);
	} else {
		response.status(404);
		throw new Error('Deck not found');
	}
});

export { getDecks, getDeckById };
