// src/routes/cardRoutes.js
// This file handles routing for card-related endpoints

import { Router } from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import cardController from '../controllers/cardController.js';

const router = Router();

// GET /cards  (public)
router.get('/', cardController.getAllCards);

// GET /cards/:id  (public)
router.get('/:id', cardController.getCardById);

// POST /cards  (admin only)
router.post('/', protect, isAdmin, cardController.createCard);

// PUT /cards/:id  (admin only)
router.put('/:id', protect, isAdmin, cardController.updateCard);

// DELETE /cards/:id  (admin only)
router.delete('/:id', protect, isAdmin, cardController.deleteCard);

export default router;
