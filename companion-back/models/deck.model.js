import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const deckSchema = new Schema({
	deck_name: {
		type: String,
		required: true,
	},
	deck_colors: {
		type: String,
	},
	deck_count: {
		type: Number,
	},
	deck_average_cmc: {
		type: Number,
	},
	deck_foils: {
		type: String,
	},
	deck_theme: {
		type: String,
		required: true,
	},
	deck_sleeve_color: {
		type: String,
		required: true,
	},
	deck_basic_lands: {
		type: Array,
	},
});

const Deck = mongoose.model('Deck', deckSchema);

export default Deck;
