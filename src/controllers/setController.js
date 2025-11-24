import * as setService from '../service/setService.js';

// GET /sets
const getAllSets = async (req, res) => {
  try {
    const sets = await setService.getAllSets();
    res.status(200).json(sets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching sets' });
  }
};

// GET /sets/:id
const getSetById = async (req, res) => {
  try {
    const { id } = req.params;
    const set = await setService.getSetById(id);
    res.status(200).json(set);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error fetching set',
    });
  }
};

// POST /sets
const createSet = async (req, res) => {
  try {
    const { name, seriesId } = req.body;

    const newSet = await setService.createSet({
      name,
      seriesId,
    });

    res.status(201).json(newSet);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error creating set',
    });
  }
};

// PUT /sets/:id
const updateSet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, seriesId } = req.body;

    const updated = await setService.updateSet(id, {
      name,
      seriesId,
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error updating set',
    });
  }
};

// DELETE /sets/:id
const deleteSet = async (req, res) => {
  try {
    const { id } = req.params;
    await setService.deleteSet(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error deleting set',
    });
  }
};

export default {
  getAllSets,
  getSetById,
  createSet,
  updateSet,
  deleteSet,
};