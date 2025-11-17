//This file will handle routing for card-related endpoints

import { Router } from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

// TODO: Create cardController
// import cardController from '../controllers/cardController'; 

const router = Router();

// GET /cards
router.get('/', (req, res) => {
    //Placeholder below
    res.json([{ "id": 4, "name": "Pikachu" }, { "id": 10, "name": "Charizard" }]);
});

// GET /cards/:id
router.get('/:id', (req, res) => {
    //Placeholder below
    res.json({ "id": 10, "name": "Charizard", "set_id": 1 });
});

// POST /cards
// We'll add 'protect' and 'isAdmin' middleware here later
router.post('/', protect, isAdmin, (req, res) => {
    //Placeholder below
    res.status(201).json({ "id": 11, "name": "Mewtwo" });
});

// PUT /cards/:id
router.put('/:id', protect, isAdmin, (req, res) => {
    //Placeholder below
    res.json({ "id": 11, "name": "Mewtwo", "variation": "Foil" });
});

// DELETE /cards/:id
router.delete('/:id', protect, isAdmin, (req, res) => {
    res.status(204).send();
});


export default router;