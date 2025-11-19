import { Router } from 'express';
import seriesController from '../controllers/seriesController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = Router();

// GET /series
router.get('/', seriesController.getAllSeries);

// GET /series/:id
router.get('/:id', seriesController.getSeriesById);

// POST /series
router.post('/', protect, isAdmin, seriesController.createSeries);

// PUT /series/:id
router.put('/:id', protect, isAdmin, seriesController.updateSeries);

// DELETE /series/:id
router.delete('/:id', protect, isAdmin, seriesController.deleteSeries);

export default router;