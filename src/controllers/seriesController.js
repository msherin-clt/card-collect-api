// --- GET All Series ---
const getAllSeries = async (req, res) => {
  try {
    // TODO: Call a service/repository to get all series from the DB
    // const series = await seriesRepository.findAll();
    
    //placeholder below
    const series = [
      { "id": 1, "name": "Pokémon TCG" },
      { "id": 2, "name": "Magic: The Gathering" }
    ];
    res.json(series);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching series' });
  }
};

// --- GET Series By ID ---
const getSeriesById = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Call a service/repository to find one series by its ID
    // const series = await seriesRepository.findById(id);

    //placeholder below
    const series = { "id": 1, "name": "Pokémon TCG", "publisher": "Nintendo" };
    
    if (series) {
      res.json(series);
    } else {
      res.status(404).json({ message: 'Series not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching series' });
  }
};

// --- CREATE New Series ---
const createSeries = async (req, res) => {
  try {
    const { name, publisher } = req.body;

    // TODO: Add validation logic here

    // TODO: Call a service/repository to create the new series in the DB
    // const newSeries = await seriesRepository.create({ name, publisher });

    //palceholder below
    const newSeries = { "id": 3, "name": name, "publisher": publisher };
    
    res.status(201).json(newSeries);
  } catch (error) {
    res.status(500).json({ message: 'Error creating series' });
  }
};

// --- UPDATE Series ---
const updateSeries = async (req, res) => {
  try {
    const { id } = req.params;
    const { publisher } = req.body; // [cite: 72]

    // TODO: Call a service/repository to update the series in the DB
    // const updatedSeries = await seriesRepository.update(id, { publisher });

    const updatedSeries = { "id": 3, "name": "Magic: The Gathering", "publisher": "Hasbro" };
    
    res.json(updatedSeries);
  } catch (error) {
    res.status(500).json({ message: 'Error updating series' });
  }
};

// --- DELETE Series ---
const deleteSeries = async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Call a service/repository to delete the series from the DB
    // await seriesRepository.delete(id);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting series' });
  }
};


export default {
  getAllSeries,
  getSeriesById,
  createSeries,
  updateSeries,
  deleteSeries
};