// --- GET /users/me/decks ---
const getUserDecks = async (req, res) => {
  try {
    // TODO: Call service to get all decks for this user

    // Placeholder below
    const decks = [
      { "id": 1, "name": "My Fire Deck", "format": "Standard" },
      { "id": 2, "name": "Classic Collection", "format": "N/A" }
    ];
    res.json(decks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching decks' });
  }
};

// --- POST /users/me/decks ---
const createDeck = async (req, res) => {
  try {
    // const userId = req.user.id;
    const { name, format, description } = req.body;
    // TODO: Call service to create new deck

    // Placeholder below
    const newDeck = {
      "id": 1,
      "userId": 1,
      "name": name,
      "format": format,
      "description": description
    };
    res.status(201).json(newDeck);
  } catch (error) {
    res.status(500).json({ message: 'Error creating deck' });
  }
};

// --- GET /users/me/decks/:id ---
const getDeckById = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Call service to get deck by id, ensuring it belongs to userId

    // Placeholder below
    const deck = {
      "id": 1,
      "userId": 1,
      "name": "My Fire Deck",
      "format": "Standard",
      "cards": [
        { "card_id": 10, "name": "Charizard", "quantity": 1 },
        { "card_id": 4, "name": "Pikachu", "quantity": 4 }
      ]
    };
    
    if (deck) {
      res.json(deck);
    } else {
      res.status(404).json({ message: 'Deck not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deck' });
  }
};

// --- PUT /users/me/decks/:id ---
const updateDeck = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    // TODO: Call service to update deck, ensuring it belongs to userId

    // Placeholder below
    const updatedDeck = {
      "id": 1,
      "userId": 1,
      "name": "My New Fire Deck",
      "format": "Standard"
    };
    res.json(updatedDeck);
  } catch (error) {
    res.status(500).json({ message: 'Error updating deck' });
  }
};

// --- DELETE /users/me/decks/:id ---
const deleteDeck = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Call service to delete deck, ensuring it belongs to userId

    // Send "NO CONTENT" response
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting deck' });
  }
};


export default {
  getUserDecks,
  createDeck,
  getDeckById,
  updateDeck,
  deleteDeck
};