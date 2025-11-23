// src/controllers/cardController.js
import * as cardService from '../service/cardService.js';

// GET /cards
const getAllCards = async (req, res) => {
  try {
    const cards = await cardService.getAllCards();
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching cards' });
  }
};

// GET /cards/:id
const getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await cardService.getCard(id);
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error fetching card',
    });
  }
};

// POST /cards  (admin only – protected in routes)
const createCard = async (req, res) => {
  try {
    // Expected body: { name, setId, number?, variation?, image_url? }
    const { name, setId, number, variation, image_url } = req.body;

    const newCard = await cardService.createCard({
      name,
      setId,
      number,
      variation,
      image_url,
    });

    res.status(201).json(newCard);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error creating card',
    });
  }
};

// PUT /cards/:id (admin only)
const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, setId, number, variation, image_url } = req.body;

    const updated = await cardService.updateCard(id, {
      name,
      setId,
      number,
      variation,
      image_url,
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error updating card',
    });
  }
};

// DELETE /cards/:id (admin only)
const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    await cardService.deleteCard(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error deleting card',
    });
  }
};

export default {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
};
