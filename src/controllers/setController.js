// --- GET All Sets ---
const getAllSets = async (req, res) => {
  try {
    //TODO: Call a service/repository to get all sets from the DB

    //Placeholder below
    const sets = [
      { "id": 1, "name": "Base Set", "series_id": 1 },
      { "id": 2, "name": "Jungle", "series_id": 1 }
    ];
    res.json(sets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sets' });
  }
};

// --- GET Set By ID ---
const getSetById = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Call a service/repository to find one set by its ID

    //Placeholder below
    const set = { "id": 1, "name": "Base Set" };

    if (set) {
      res.json(set);
    } else {
      res.status(404).json({ message: 'Set not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching set' });
  }
};

// --- CREATE New Set ---
const createSet = async (req, res) => {
  try {
    const { name, series_id } = req.body;
    
    // TODO: Call a service/repository to create the new set in the DB

    //Placeholder below
    const newSet = { "id": 3, "name": name, "series_id": series_id };
    
    res.status(201).json(newSet);
  } catch (error) {
    res.status(500).json({ message: 'Error creating set' });
  }
};

// --- UPDATE Set ---
const updateSet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // TODO: Call a service/repository to update the set in the DB

    //Placeholder below
    const updatedSet = { "id": 1, "name": "Base Set 2" };
    
    res.json(updatedSet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating set' });
  }
};

// --- DELETE Set ---
const deleteSet = async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Call a service/repository to delete the set from the DB

    // Send "NO CONTENT" response
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting set' });
  }
};


export default {
  getAllSets,
  getSetById,
  createSet,
  updateSet,
  deleteSet
};