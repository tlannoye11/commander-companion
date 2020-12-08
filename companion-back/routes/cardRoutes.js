import express from 'express';
import { getCards, getCardsByDeck } from '../controllers/cardController.js';

const router = express.Router();

router.route('/').get(getCards);
router.route('/deck/:id').get(getCardsByDeck);

export default router;
