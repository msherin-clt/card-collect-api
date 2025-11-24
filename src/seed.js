import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Utility to safely clear a table if it exists
async function clearTable(tableName) {
  const res = await pool.query(
    `SELECT to_regclass($1) AS table_exists`,
    [tableName]
  );
  if (res.rows[0].table_exists) {
    console.log(`Clearing table: ${tableName}`);
    await pool.query(`DELETE FROM ${tableName}`);
  } else {
    console.log(`Table ${tableName} does not exist, skipping`);
  }
}

async function seed() {
  try {
    // Clear tables (if they exist)
    await clearTable('decks_cards');
    await clearTable('decks');
    await clearTable('collections');
    await clearTable('cards');
    await clearTable('sets');
    await clearTable('series');
    await clearTable('users');

    // Create users
    const hashedAdmin = await bcrypt.hash('adminpass', 10);
    await pool.query(
      `INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)`,
      ['adminuser', 'admin@example.com', hashedAdmin, 'admin']
    );

    const hashedUser = await bcrypt.hash('userpass', 10);
    await pool.query(
      `INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)`,
      ['regularuser', 'user@example.com', hashedUser, 'user']
    );

    // Create series
    const seriesRes = await pool.query(
      `INSERT INTO series (name, publisher) VALUES ($1, $2) RETURNING id`,
      ['Pokémon TCG', 'Nintendo']
    );
    const seriesId = seriesRes.rows[0].id;

    // Create sets
    const setRes = await pool.query(
      `INSERT INTO sets (name, series_id, set_cards) VALUES ($1, $2, $3) RETURNING id`,
      ['Base Set', seriesId, 102]
    );
    const setId = setRes.rows[0].id;

    // Create cards
    const cardRes = await pool.query(
      `INSERT INTO cards (name, set_id, variation, number) VALUES ($1, $2, $3, $4) RETURNING id`,
      ['Charizard', setId, 'Holographic', '4/102']
    );
    const cardId = cardRes.rows[0].id;

    // Add to regular user's collection
    const userRes = await pool.query(`SELECT id FROM users WHERE username = $1`, ['regularuser']);
    const userId = userRes.rows[0].id;

    const collectionsExists = await pool.query(
      `SELECT to_regclass('collections') AS table_exists`
    );

    if (collectionsExists.rows[0].table_exists) {
      await pool.query(
        `INSERT INTO collections (user_id, card_id, condition) VALUES ($1, $2, $3)`,
        [userId, cardId, 'Near Mint']
      );
    }

    console.log('Database seeding complete!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await pool.end();
  }
}

seed();
