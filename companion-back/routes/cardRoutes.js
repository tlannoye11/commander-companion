import express from 'express';
import {
	getCardById,
	getCards,
	deleteCard,
	createCard,
	updateCard,
} from '../controllers/cardController.js';

const router = express.Router();

router.route('/').get(getCards).post(createCard);
router.route('/:id').get(getCardById).delete(deleteCard).put(updateCard);

export default router;
