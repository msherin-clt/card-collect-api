// src/controllers/userController.js
import { signUp, login } from '../service/userService.js';
import {
  findUserById,
  updateUserProfile,
  getUserCollection,
  addUserCollectionItem,
} from '../repositories/userRepo.js';
import * as collectionService from '../service/collectionService.js';

// --- POST /auth/register ---
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // TODO comments are effectively handled inside signUp()

    const result = await signUp(username, email, password);

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    res.status(status).json({ message: error.message || 'Error registering user' });
  }
};

// --- POST /auth/login ---
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await login(email, password);

    res.json(result);
  } catch (error) {
    console.error(error);
    const status = error.status || 401;
    res.status(status).json({ message: error.message || 'Invalid credentials' });
  }
};

// --- GET /users/me ---
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// --- PUT /users/me ---
const updateUserProfileController = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.body.password || req.body.email) {
      return res.status(400).json({ message: 'Cannot update email or password here' });
    }

    const { username } = {};

    if (req.body.username){
      username: req.body.username
    }
    else {
      return res.status(400).json({ message: 'No valid fields to update' });
    }



    const updated = await updateUserProfile(userId, { username });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// --- GET /users/me/collection ---
const getUserCollectionController = async (req, res) => {
  try {
    const userId = req.user.id; // set by protect middleware

    const collection = await collectionService.getUserCollection(userId);

    res.json(collection);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    res.status(status).json({ message: error.message || 'Error fetching collection' });
  }
};

// --- POST /users/me/collection ---
const addUserCollectionItemController = async (req, res) => {
  try {
    const userId = req.user.id;
    // Expect body like: { "cardId": 5, "condition": "Near Mint" }
    const { cardId, condition } = req.body;

    const newItem = await collectionService.addUserCollectionItem(
      userId,
      cardId,
      condition
    );

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    res.status(status).json({ message: error.message || 'Error adding to collection' });
  }
};

export default {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile: updateUserProfileController,
  getUserCollection: getUserCollectionController,
  addUserCollectionItem: addUserCollectionItemController,
};
