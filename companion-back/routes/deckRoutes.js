import express from 'express';
import {
	getDeckById,
	getDecks,
	createDeck,
	deleteDeck,
	updateDeck,
} from '../controllers/deckController.js';

const router = express.Router();

router.route('/').get(getDecks).post(createDeck);
router.route('/:id').get(getDeckById).delete(deleteDeck).put(updateDeck);

export default router;
