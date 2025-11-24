import prisma from '../config/db.js';

// Find all decks belonging to a specific user
export async function findAllDecksByUserId(userId) {
  return prisma.deck.findMany({
    where: { userId: Number(userId) },
    include: {
      cards: true, // Assuming a 'cards' relationship (DeckCard entries)
    },
    orderBy: { id: 'asc' },
  });
}

// Get a single deck by ID, restricted to a specific user
export async function findDeckByIdAndUserId(id, userId) {
  return prisma.deck.findFirst({
    where: {
      id: Number(id),
      userId: Number(userId),
    },
    include: {
      cards: true,
    },
  });
}

// Create a new deck
export async function createDeck(data) {
  // data includes { userId, name, format, description }
  return prisma.deck.create({
    data,
    include: {
      cards: true,
    },
  });
}

// Update an existing deck, restricted to a specific user
export async function updateDeck(id, userId, data) {
  return prisma.deck.update({
    where: {
      id: Number(id),
      userId: Number(userId),
    },
    data,
    include: {
      cards: true,
    },
  });
}

// Delete a deck by ID, restricted to a specific user
export async function deleteDeck(id, userId) {
  return prisma.deck.delete({
    where: {
      id: Number(id),
      userId: Number(userId),
    },
  });
}