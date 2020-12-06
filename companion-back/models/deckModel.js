import mongoose from 'mongoose';

const deckSchema = mongoose.Schema(
	{
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
		},
		deck_sleeve_color: {
			type: String,
		},
		deck_basic_lands: {
			type: Array,
		},
	},
	{
		timestamps: true,
	}
);

const Deck = mongoose.model('Deck', deckSchema);

export default Deck;
