import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cardSchema = new Schema({
	deckId: {
		type: String,
		required: true,
	},
	scryfallId: {
		type: String,
		required: false,
	},
	qty: {
		type: Number,
		required: true,
		default: 1,
	},
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	edition: {
		type: String,
		required: true,
	},
	collectorNumber: {
		type: String,
		required: true,
	},
	cmc: {
		type: Number,
		required: true,
		default: 0,
	},
	isFoil: {
		type: Boolean,
		required: true,
		default: false,
	},
	isCommander: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const Card = mongoose.model('Card', cardSchema);

export default Card;
