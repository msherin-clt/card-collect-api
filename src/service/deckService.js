import { Prisma } from '@prisma/client';
import {
  findAllDecksByUserId,
  findDeckByIdAndUserId,
  createDeck as createDeckRepo,
  updateDeck as updateDeckRepo,
  deleteDeck as deleteDeckRepo,
} from '../repositories/deckRepo.js';

// --- Authorization Helper ---
const deckNotFoundOrUnauthorizedError = () => {
  const err = new Error('Deck not found or access unauthorized');
  err.status = 404; // Use 404 to hide whether the deck exists or not for security
  throw err;
};

// --- Service Functions ---

export async function getUserDecks(userId) {
  return findAllDecksByUserId(userId);
}

export async function createDeck(payload) {
  const { userId, name, format, description } = payload;

  if (!userId || !name) {
    const err = new Error('userId and name are required');
    err.status = 400;
    throw err;
  }

  try {
    return await createDeckRepo({
      userId: Number(userId),
      name,
      format: format ?? null,
      description: description ?? null,
    });
  } catch (error) {
    // Check for P2003 if 'userId' references a non-existent User in the database
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
      const err = new Error('Invalid userId (referenced User does not exist)');
      err.status = 400;
      throw err;
    }
    throw error;
  }
}

export async function getDeckById(id, userId) {
  const deck = await findDeckByIdAndUserId(id, userId);

  if (!deck) {
    deckNotFoundOrUnauthorizedError();
  }
  return deck;
}

export async function updateDeck(id, userId, payload) {
  const data = {};
  if (payload.name !== undefined) data.name = payload.name;
  if (payload.format !== undefined) data.format = payload.format;
  if (payload.description !== undefined) data.description = payload.description;

  if (Object.keys(data).length === 0) {
    const err = new Error('No valid fields provided to update');
    err.status = 400;
    throw err;
  }

  try {
    return await updateDeckRepo(id, userId, data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        deckNotFoundOrUnauthorizedError();
      }
    }
    throw error;
  }
}

export async function deleteDeck(id, userId) {
  try {
    await deleteDeckRepo(id, userId);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      deckNotFoundOrUnauthorizedError();
    }
    throw error;
  }
}