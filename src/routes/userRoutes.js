import { Router } from 'express';
import userController from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// --- Auth Routes ---
// POST /api/auth/register
router.post('/auth/register', userController.registerUser);

// POST /api/auth/login
router.post('/auth/login', userController.loginUser);


// --- User Routes ---
// GET /api/users/me
router.get('/users/me', protect, userController.getUserProfile);

// PUT /api/users/me
router.put('/users/me', protect, userController.updateUserProfile);

// GET /api/users/me/collection
router.get('/users/me/collection', protect, userController.getUserCollection);

// POST /api/users/me/collection
router.post('/users/me/collection', protect, userController.addUserCollectionItem);

export default router;