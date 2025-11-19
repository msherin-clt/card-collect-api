// --- POST /auth/register ---
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // TODO: Hash password
    // TODO: Create user in DB
    // TODO: Generate JWT token

    //Placeholder below
    res.status(201).json({ "id": 1, "username": username, "email": email });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

// --- POST /auth/login ---
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // TODO: Find user by email
    // TODO: Compare hashed password
    // TODO: Generate JWT token

    //Placeholder below
    res.json({ "token": "eyJhbGciOiJIUzI1NiIsInR5..." });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// --- GET /users/me ---
const getUserProfile = async (req, res) => {
  try {

    //Placeholder below
    res.json({ "id": 1, "username": "collector1", "email": "user@email.com" });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// --- PUT /users/me ---
const updateUserProfile = async (req, res) => {
  try {
    const { username } = req.body;

    //Placeholder below
    res.json({ "id": 1, "username": "top_collector", "email": "user@email.com" });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// --- GET /users/me/collection ---
const getUserCollection = async (req, res) => {
  try {

    //Placeholder below
    const collection = [
      {"card_id": 10, "name": "Charizard", "set": "Base Set", "condition": "Near Mint"}
    ];
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collection' });
  }
};

// --- POST /users/me/collection ---
const addUserCollectionItem = async (req, res) => {
  try {
    const { card_id, condition } = req.body;

    //Placeholder below
    const newItem = { "id": 123, "user_id": 1, "card_id": card_id, "condition": condition };
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to collection' });
  }
};


export default {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUserCollection,
  addUserCollectionItem
};