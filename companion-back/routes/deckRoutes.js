import express from 'express';
const router = express.Router();
import {
	getDeckById,
	getDecks,
	createDeck,
	deleteDeck,
	updateDeck,
} from '../controllers/deckController.js';

router.route('/').get(getDecks).post(createDeck);
router.route('/:id').get(getDeckById).delete(deleteDeck).put(updateDeck);

export default router;
