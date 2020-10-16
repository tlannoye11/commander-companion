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

	// Run the query
	CardModel.find(query, (err, cards) => {
		if (err) {
			console.log(`Error getting cards: ${err}`);
		} else {
			response.json(cards);
		}
	});
});

// Add a card to a deck
cardRouter.post('/add', (request, response) => {
	let card = new CardModel({
		deck_id: request.body.deck_id,
		scryfall_id: request.body.scryfall_id,
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
			response.status(400).send('Failed to add card to deck');
		});
});

// Update an existing card in a deck.
cardRouter.post('/update/:id', (request, response) => {
	CardModel.findById(request.params.id, (err, card) => {
		if (err) {
			console.log(`Error updating cards: ${err}`);
			response.status(400).send(`Error updating cards: ${err}`);
		} else if (!card) {
			response
				.status(400)
				.send(`Couldn't find a card with id ${request.params.id}`);
		} else {
			if (request.body.deck_id) {
				card.deck_id = request.body.deck_id;
			}

			if (request.body.scryfall_id) {
				card.scryfall_id = request.body.scryfall_id;
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
					response.status(400).send('Failed to update card');
				});
		}
	});
});

// Delete a card from a deck list.
cardRouter.delete('/delete/:id/', (request, response) => {
	CardModel.findByIdAndRemove(request.params.id, (err) => {
		if (err) {
			response.json(`Error deleting card: ${id}`);
		} else {
			response.json(`Card has been deleted`);
		}
	});
});

export default cardRouter;
