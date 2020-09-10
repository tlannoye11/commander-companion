const express = require('express');
const deckRouter = express.Router();

let DeckModel = require('../models/deck.model');
const { request, response } = require('express');

// Get all decks
deckRouter.get('/', (request, response) => {
    DeckModel.find((err, decks) => {
        if (err) {
            console.log(`Error getting decks: ${err}`);
        }
        else {
            response.json(decks);
        }
    });
});

// Get a single deck by ID
deckRouter.get('/:id', (request, response) => {
    let id = request.params.id;
    DeckModel.findById(id, (err, deck) => {
        response.json(deck);
    });
});

// Add a deck to the database
deckRouter.post('/add', (request, response) => {
    let deck = new DeckModel({
        deck_name: request.body.deck_name,
        deck_theme: request.body.deck_theme,
        deck_sleeve_color: request.body.deck_sleeve_color
    });

    deck.save()
        .then((todo) => {
            response.status(200).json({ deck: 'Deck added successfully' });
        })
        .catch((err) => {
            response.status(400).send('Failed to add new deck');
        });
});

// Update an existing deck in the database
deckRouter.post('/update/:id', (request, response) => {
    DeckModel.findById(request.params.id, (err, deck) => {
        if (!deck) {
            response.status(400).send("Couldn't find a deck");
        }
        else {
            deck.deck_name = request.body.deck_name;
            deck.deck_theme = request.body.deck_theme;
            deck.deck_sleeve_color = request.body.deck_sleeve_color;

            deck.save()
                .then((deck) => {
                    response.json('Deck has been updated');
                })
                .catch((err) => {
                    response.status(400).send('Failed to update deck');
                });
        }
    });
});

// Delete a deck from the database
deckRouter.delete('/delete/:id', (request, response) => {
    DeckModel.findByIdAndRemove(request.params.id, (err, deck) => {
        if (err) {
            console.log(`Error deleting deck: ${id}`);
        }
        else {
            response.json(deck);
        }
    });
});

module.exports = deckRouter;
