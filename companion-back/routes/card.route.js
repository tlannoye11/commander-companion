import express from 'express';
const cardRouter = express.Router();
import CardModel from '../models/card.model.js';

// Get a number of cards within a deck
cardRouter.get('/', (request, response) => {
	// response.status(200).send("Getting list of cards");
	let query = {};

	// Optional params
	if (request.query.card_id) {
		query._id = request.query.card_id;
	}

	if (request.query.deck_id) {
		query.deck_id = request.query.deck_id;
	}

	if (request.query.scryfall_id) {
		query.scryfall_id = request.query.scryfall_id;
	}

	if (request.query.card_name) {
		query.card_name = request.query.card_name;
	}

	// Run the query
	CardModel.find(query, (err, cards) => {
		if (err) {
			response.status(400).json(`Error getting cards: ${err}`);
		} else {
			response.status(200).json({
				message: 'Cards found successfully',
				cards: cards,
			});
		}
	});
});

// Add a card to a deck
cardRouter.post('/add', (request, response) => {
	let card = new CardModel({
		deck_id: request.body.deck_id,
		scryfall_id: request.body.scryfall_id,
		card_qty: request.body.card_qty,
		card_name: request.body.card_name,
		card_type: request.body.card_type,
		card_set: request.body.card_set,
		is_foil: request.body.is_foil,
		card_cmc: request.body.card_cmc,
		is_commander: request.body.is_commander,
	});

	card.save()
		.then((card) => {
			response.status(200).json({
				message: `Card ${card} added to deck`,
				card_id: card._id,
			});
		})
		.catch((err) => {
			response.status(400).json(`Error adding card to deck: ${err}`);
		});
});

// Update an existing card in a deck.
cardRouter.post('/update/:id', (request, response) => {
	CardModel.findById(request.params.id, (err, card) => {
		if (err) {
			response.status(400).json(`Error updating card: ${err}`);
		} else if (!card) {
			response
				.status(400)
				.json(`Error finding a card with id ${request.params.id}`);
		} else {
			if ('deck_id' in request.body) {
				card.deck_id = request.body.deck_id;
			}

			if ('scryfall_id' in request.body) {
				card.scryfall_id = request.body.scryfall_id;
			}

			if ('card_qty' in request.body) {
				card.card_qty = request.body.card_qty;
			}

			if ('card_name' in request.body) {
				card.card_name = request.body.card_name;
			}

			if ('card_set' in request.body) {
				card.card_set = request.body.card_set;
			}

			if ('is_foil' in request.body) {
				card.is_foil = request.body.is_foil;
			}

			if ('is_commander' in request.body) {
				card.is_commander = request.body.is_commander;
			}

			card.save()
				.then((card) => {
					response
						.status(200)
						.json(`Card ${request.params.id} has been updated`);
				})
				.catch((err) => {
					response.status(400).json(`Error updating card: ${err}`);
				});
		}
	});
});

// Delete a card from a deck list.
cardRouter.delete('/delete/:id/', (request, response) => {
	CardModel.findByIdAndRemove(request.params.id, (err) => {
		if (err) {
			response.status(400).json(`Error deleting card: ${err}`);
		} else {
			response.status(200).json(`Card has been deleted`);
		}
	});
});

export default cardRouter;
