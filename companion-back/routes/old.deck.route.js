import express from 'express';
const deckRouter = express.Router();
import DeckModel from '../models/deck.model.js';

// Get a number of decks
deckRouter.get('/', (request, response) => {
	let query = {};

	// Optional params
	if (request.query.deck_id) {
		query._id = request.query.deck_id;
	}

	// Run the query
	DeckModel.find(query, (err, decks) => {
		if (err) {
			response.status(400).json(`Error getting decks: ${err}`);
		} else {
			// response.status(200).json({
			// 	message: 'Deck found using this ID:',
			// 	requestIn: request.query,
			// });
			response.status(200).json({
				message: 'Decks found successfully',
				decks: decks,
			});
		}
	});
});

// Add a deck to the database
deckRouter.post('/add', (request, response) => {
	let deck = new DeckModel({
		deck_name: request.body.deck_name,
		deck_theme: request.body.deck_theme,
		deck_sleeve_color: request.body.deck_sleeve_color,
	});

	deck.save()
		.then((deck) => {
			response.status(200).json({
				message: 'Deck added successfully',
				id: deck._id,
			});
		})
		.catch((err) => {
			response.status(400).json(`Error adding new deck: ${err}`);
		});
});

// Update an existing deck in the database
deckRouter.post('/update/:id', (request, response) => {
	DeckModel.findById(request.params.id, (err, deck) => {
		if (err) {
			response.status(400).send(`Error updating deck: ${err}`);
		} else if (!deck) {
			response
				.status(400)
				.json(`Error finding a deck with id: ${request.params.id}`);
		} else {
			deck.deck_name = request.body.deck_name;
			deck.deck_theme = request.body.deck_theme;
			deck.deck_sleeve_color = request.body.deck_sleeve_color;

			deck.save()
				.then((deck) => {
					response
						.status(200)
						.json(`Deck ${request.params.id} has been updated`);
				})
				.catch((err) => {
					response.status(400).send(`Error updating deck: ${err}`);
				});
		}
	});
});

// Delete a deck from the database
deckRouter.delete('/delete/:id', (request, response) => {
	DeckModel.findByIdAndRemove(request.params.id, (err, deck) => {
		if (err) {
			response.status(400).json(`Error deleting deck: ${id}`);
		} else {
			response.status(200).json(`Deck has been deleted`);
		}
	});
});

export default deckRouter;
