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
				message: `Cards found successfully`,
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
		card_set: request.body.card_set,
		is_foil: request.body.is_foil,
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
			response.status(400).send(`Error updating card: ${err}`);
		} else if (!card) {
			response
				.status(400)
				.send(`Error finding a card with id ${request.params.id}`);
		} else {
			if (request.body.deck_id) {
				card.deck_id = request.body.deck_id;
			}

			if (request.body.scryfall_id) {
				card.scryfall_id = request.body.scryfall_id;
			}

			if (request.body.card_qty) {
				card.card_qty = request.body.card_qty;
			}

			if (request.body.card_name) {
				card.card_name = request.body.card_name;
			}

			if (request.body.card_set) {
				card.card_set = request.body.card_set;
			}

			if (request.body.is_foil) {
				card.is_foil = request.body.is_foil;
			}

			card.save()
				.then((card) => {
					response
						.status(200)
						.send(`Card ${request.params.id} has been updated`);
				})
				.catch((err) => {
					response.status(400).send(`Error updating card: ${err}`);
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
