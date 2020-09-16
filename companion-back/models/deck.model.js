const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DeckModel = new Schema({
    deck_name: {
        type: String,
        required: true
    },
    deck_colors: {
        type: String
    },
    deck_count: {
        type: Number
    },
    deck_average_cmc: {
        type: Number
    },
    deck_foils: {
        type: String
    },
    deck_theme: {
        type: String,
        required: true
    },
    deck_sleeve_color: {
        type: String,
        required: true
    },
    deck_basic_lands: {
        type: Array
    }
});

module.exports = mongoose.model('DeckModel', DeckModel);
