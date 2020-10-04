const express = require('express');
const cardRouter = express.Router();

let CardModel = require('../models/card.model');
const { request, response } = require('express');

// Get a number of cards within a deck
cardRouter.get('/deck/', (request, response) => {
    let query = {
        'deck_id': request.query.deck_id,
    };

    // Optional card_id param
    if (request.query.card_id) {
        query.card_id = request.query.card_id;
    }

    CardModel.find(query, (err, cards) => {
        if (err) {
            console.log(`Error getting cards: ${err}`);
        }
        else {
            response.json(cards);
        }
    });
});

// Add a card to a deck
cardRouter.post('/add', (request, response) => {
    let card = new CardModel({
        card_id: request.body.card_id,
        deck_id: request.body.deck_id,
        is_foil: request.body.is_foil
    });

    card.save()
        .then((card) => {
            response.status(200).json({ deck: 'Card added to deck'});
        })
        .catch((err) => {
            response.status(400).send('Failed to add card to deck');
        });
})

// Update an existing card in a deck.
cardRouter.post('/update/:id', (request, response) => {
    CardModel.findById(request.params.id, (err, card) => {
        if (!card) {
            response.status(400).send("Couldn't find a card");
        }
        else {
            card.card_id = request.body.card_id;
            card.deck_id = request.body.deck_id;
            card.is_foil = request.body.is_foil;

            card.save()
                .then((card) => {
                    response.json('Card has been updated');
                })
                .catch((err) => {
                    response.status(400).send('Failed to update card');
                });
        }
    });
});

// Delete a card from a deck list.
cardRouter.delete('delete/:id/', (request, response) => {
    CardModel.findByIdAndRemove(request.params.id, (err, deck) => {
        if (err) {
            console.log(`Error deleting card: ${id}`);
        }
        else {
            response.json(card);
        }
    });
});

module.exports = cardRouter;
