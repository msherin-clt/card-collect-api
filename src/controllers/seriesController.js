// src/controllers/seriesController.js
import * as seriesService from '../service/seriesService.js'; // Assuming seriesService exists

// --- GET All Series ---
const getAllSeries = async (req, res) => {
  try {
    const series = await seriesService.getAllSeries(); // Calling service layer
    res.status(200).json(series); // Use 200 for success
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching series' });
  }
};

// --- GET Series By ID ---
const getSeriesById = async (req, res) => {
  try {
    const { id } = req.params;
    const series = await seriesService.getSeriesById(id); // Calling service layer

    if (series) {
      res.status(200).json(series); // Use 200 for success
    } else {
      // Assuming the service layer returns null/undefined if not found
      res.status(404).json({ message: 'Series not found' });
    }
  } catch (error) {
    console.error(error);
    // Use the error status from the service if available, otherwise 500
    res.status(error.status || 500).json({
      message: error.message || 'Error fetching series',
    });
  }
};

// --- CREATE New Series ---
const createSeries = async (req, res) => {
  try {
    const { name, publisher } = req.body;

    const newSeries = await seriesService.createSeries({ name, publisher }); // Calling service layer

    res.status(201).json(newSeries); // Use 201 for resource creation
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error creating series',
    });
  }
};

// --- UPDATE Series ---
const updateSeries = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, publisher } = req.body; // Including 'name' for a more complete update payload

    const updatedSeries = await seriesService.updateSeries(id, { name, publisher }); // Calling service layer

    if (updatedSeries) {
      res.status(200).json(updatedSeries); // Use 200 for successful update
    } else {
      res.status(404).json({ message: 'Series not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error updating series',
    });
  }
};

// --- DELETE Series ---
const deleteSeries = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCount = await seriesService.deleteSeries(id); // Calling service layer

    if (deletedCount > 0) {
      res.status(204).send(); // Use 204 for successful deletion with no content
    } else {
      res.status(404).json({ message: 'Series not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Error deleting series',
    });
  }
};


export default {
  getAllSeries,
  getSeriesById,
  createSeries,
  updateSeries,
  deleteSeries
};