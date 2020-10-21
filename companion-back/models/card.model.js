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
		default: 1,
	},
	card_name: {
		type: String,
		required: true,
	},
	card_type: {
		type: String,
		required: true,
	},
	card_set: {
		type: String,
		required: true,
	},
	card_cmc: {
		type: Number,
		required: true,
		default: 0,
	},
	is_foil: {
		type: Boolean,
		required: true,
		default: false,
	},
	is_commander: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const Card = mongoose.model('Card', cardSchema);

export default Card;
