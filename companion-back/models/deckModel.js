import mongoose from 'mongoose';

const deckSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		colors: {
			type: String,
		},
		count: {
			type: Number,
		},
		averageCmc: {
			type: Number,
		},
		foils: {
			type: String,
		},
		theme: {
			type: String,
		},
		sleeveColor: {
			type: String,
		},
		basicLands: {
			type: Array,
		},
	},
	{
		timestamps: true,
	}
);

const Deck = mongoose.model('Deck', deckSchema);

export default Deck;
