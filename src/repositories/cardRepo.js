// src/repositories/cardRepo.js
import prisma from '../config/db.js';

// Get all cards (with set + series if you want richer data)
export async function findAllCards() {
  return prisma.card.findMany({
    include: {
      set: {
        include: {
          series: true,
        },
      },
    },
    orderBy: { id: 'asc' },
  });
}

// Get a single card by ID
export async function findCardById(id) {
  return prisma.card.findUnique({
    where: { id: Number(id) },
    include: {
      set: {
        include: {
          series: true,
        },
      },
    },
  });
}

// Create a new card
export async function createCard(data) {
  return prisma.card.create({
    data,
    include: {
      set: {
        include: {
          series: true,
        },
      },
    },
  });
}

// Update an existing card
export async function updateCard(id, data) {
  return prisma.card.update({
    where: { id: Number(id) },
    data,
    include: {
      set: {
        include: {
          series: true,
        },
      },
    },
  });
}

// Delete a card by ID
export async function deleteCard(id) {
  return prisma.card.delete({
    where: { id: Number(id) },
  });
}
