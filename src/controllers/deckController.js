import * as deckService from '../service/deckService.js';

// --- GET /users/me/decks ---
const getUserDecks = async (req, res) => {
  try {
    // Assuming authentication middleware attaches user info to req.user
    const userId = req.user.id;
    const decks = await deckService.getUserDecks(userId);
    res.status(200).json(decks);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error fetching user decks',
    });
  }
};

// --- POST /users/me/decks ---
const createDeck = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, format, description } = req.body;

    const newDeck = await deckService.createDeck({
      userId,
      name,
      format,
      description,
    });

    res.status(201).json(newDeck);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error creating deck',
    });
  }
};

// --- GET /users/me/decks/:id ---
const getDeckById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deck = await deckService.getDeckById(id, userId);

    res.status(200).json(deck);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error fetching deck',
    });
  }
};

// --- PUT /users/me/decks/:id ---
const updateDeck = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, format, description } = req.body;

    const updatedDeck = await deckService.updateDeck(id, userId, {
      name,
      format,
      description,
    });

    res.status(200).json(updatedDeck);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error updating deck',
    });
  }
};

// --- DELETE /users/me/decks/:id ---
const deleteDeck = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await deckService.deleteDeck(id, userId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error deleting deck',
    });
  }
};


export default {
  getUserDecks,
  createDeck,
  getDeckById,
  updateDeck,
  deleteDeck
};