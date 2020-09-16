const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CardModel = new Schema({
    card_id: {
        type: String,
        required: true
    },
    deck_id: {
        type: String,
        required: true
    },
    is_foil: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('CardModel', CardModel);
