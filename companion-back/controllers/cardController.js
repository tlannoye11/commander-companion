import asyncHandler from 'express-async-handler';
import Card from '../models/cardModel.js';

const getCards = asyncHandler(async (request, response) => {
	const cards = await Card.find();

	response.json(cards);
});

const getCardsByDeck = asyncHandler(async (request, response) => {
	const cards = await Card.find({ deckId: request.params.id });

	if (cards) {
		response.json(cards);
	} else {
		response.status(404);
		throw new Error('Cards not found');
	}
});

export { getCards, getCardsByDeck };
