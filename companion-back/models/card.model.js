const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CardModel = new Schema({
    deck_id: {
        type: String,
        required: true
    },
    scryfall_id: {
        type: String,
        required: true
    },
    card_set: {
        type: String,
        required: true
    },
    is_foil: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Card', CardModel);
