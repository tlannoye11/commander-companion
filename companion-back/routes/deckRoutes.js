import express from 'express';
const router = express.Router();
import { getDeckById, getDecks } from '../controllers/deckController.js';

router.route('/').get(getDecks);
router.route('/:id').get(getDeckById);

export default router;
