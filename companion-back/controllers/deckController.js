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
		name: 'New Deck',
		colors: '',
		count: 0,
		averageCmc: 0,
		foils: '',
		theme: '',
		sleeveColor: '',
		basicLands: '',
	});

	const createdDeck = await deck.save();
	response.status(201).json(createdDeck);
});

const updateDeck = asyncHandler(async (request, response) => {
	const {
		name,
		colors,
		count,
		averageCmc,
		foils,
		theme,
		sleeveColor,
		basicLands,
	} = request.body;

	const deck = await Deck.findById(request.params.id);

	if (deck) {
		deck.name = name;
		deck.colors = colors;
		deck.count = count;
		deck.averageCmc = averageCmc;
		deck.foils = foils;
		deck.theme = theme;
		deck.sleeveColor = sleeveColor;
		deck.basicLands = basicLands;

		const updatedDeck = await deck.save();
		response.json(updatedDeck);
	} else {
		response.status(404);
		throw new Error('Deck not found');
	}
});

export { getDecks, getDeckById, deleteDeck, createDeck, updateDeck };
