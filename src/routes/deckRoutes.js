// src/routes/deckRoutes.js

import { Router } from 'express';
import deckController from '../controllers/deckController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// All deck routes are protected
router.use(protect);

// GET /api/users/me/decks
router.get('/', deckController.getUserDecks);

// POST /api/users/me/decks
router.post('/', deckController.createDeck);

// GET /api/users/me/decks/:id
router.get('/:id', deckController.getDeckById);

// PUT /api/users/me/decks/:id
router.put('/:id', deckController.updateDeck);

// DELETE /api/users/me/decks/:id
router.delete('/:id', deckController.deleteDeck);

export default router;