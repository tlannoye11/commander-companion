import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cardSchema = new Schema({
	deck_id: {
		type: String,
		required: true,
	},
	scryfall_id: {
		type: String,
		required: true,
	},
	card_qty: {
		type: Number,
		required: true,
	},
	card_name: {
		type: String,
		required: true,
	},
	card_set: {
		type: String,
		required: true,
	},
	is_foil: {
		type: Boolean,
		required: true,
	},
});

const Card = mongoose.model('Card', cardSchema);

export default Card;
