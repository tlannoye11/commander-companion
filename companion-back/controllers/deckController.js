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

const deleteDeck = asyncHandler(async (request, response) => {
	const deck = await Deck.findById(request.params.id);

	if (deck) {
		await deck.remove();
		response.json({ message: 'Deck removed' });
	} else {
		response.status(404);
		throw new Error('Deck not found');
	}
});

const createDeck = asyncHandler(async (request, response) => {
	const deck = new Deck({
		deck_name: 'New Deck',
		deck_colors: '',
		deck_count: 0,
		deck_average_cmc: 0,
		deck_foils: '',
		deck_theme: '',
		deck_sleeves: '',
		deck_basic_lands: '',
	});

	const createdDeck = await deck.save();
	response.status(201).json(createdDeck);
});

export { getDecks, getDeckById, deleteDeck, createDeck };
