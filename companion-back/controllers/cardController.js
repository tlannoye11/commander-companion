import asyncHandler from 'express-async-handler';
import Card from '../models/cardModel.js';

const getCards = asyncHandler(async (request, response) => {
	const deck = request.query.deck ? { deckId: request.query.deck } : {};
	const cards = await Card.find({ ...deck });

	response.json(cards);
});

const getCardById = asyncHandler(async (request, response) => {
	const card = await Card.findById(request.params.id);

	if (card) {
		response.json(card);
	} else {
		response.status(404);
		throw new Error('Card not found');
	}
});

const deleteCard = asyncHandler(async (request, response) => {
	const card = await Card.findById(request.params.id);

	if (card) {
		await card.remove();
		response.json({ message: 'Card removed' });
	} else {
		response.status(404);
		throw new Error('Card not found');
	}
});

const createCard = asyncHandler(async (request, response) => {
	const { deckId } = request.body;
	const card = new Card({
		qty: 1,
		name: 'Sample name',
		type: 'C',
		edition: 'CMD',
		collectorNumber: '',
		cmc: 0,
		isFoil: false,
		isCommander: false,
		deckId: deckId,
	});

	const createdCard = await card.save();
	response.status(201).json(createdCard);
});

const updateCard = asyncHandler(async (request, response) => {
	const {
		qty,
		name,
		type,
		edition,
		collectorNumber,
		cmc,
		isFoil,
		isCommander,
	} = request.body;

	const card = await Card.findById(request.params.id);

	if (card) {
		card.qty = qty;
		card.name = name;
		card.type = type;
		card.edition = edition;
		card.collectorNumber = collectorNumber;
		card.cmc = cmc;
		card.isFoil = isFoil;
		card.isCommander = isCommander;

		const updatedCard = await card.save();
		response.json(updatedCard);
	} else {
		response.status(404);
		throw new Error('Card not found');
	}
});

export { getCards, getCardById, deleteCard, createCard, updateCard };
