import { Router } from 'express';
import setController from '../controllers/setController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = Router();

// GET /api/sets
router.get('/', setController.getAllSets);

// GET /api/sets/:id 
router.get('/:id', setController.getSetById);

// POST /api/sets
router.post('/', protect, isAdmin, setController.createSet);

// PUT /api/sets/:id 
router.put('/:id', protect, isAdmin, setController.updateSet);

// DELETE /api/sets/:id 
router.delete('/:id', protect, isAdmin, setController.deleteSet);

export default router;