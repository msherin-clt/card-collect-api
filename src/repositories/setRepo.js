import prisma from '../config/db.js';

// Get all sets (with related series)
export async function findAllSets() {
  return prisma.set.findMany({
    include: {
      series: true,
    },
    orderBy: { id: 'asc' },
  });
}

// Get a single set by ID (including related series and cards)
export async function findSetById(id) {
  return prisma.set.findUnique({
    where: { id: Number(id) },
    include: {
      series: true,
      cards: true, // Assuming a 'cards' relationship exists on the Set model
    },
  });
}

// Create a new set
export async function createSet(data) {
  return prisma.set.create({
    data,
    include: {
      series: true,
    },
  });
}

// Update an existing set
export async function updateSet(id, data) {
  return prisma.set.update({
    where: { id: Number(id) },
    data,
    include: {
      series: true,
    },
  });
}

// Delete a set by ID
export async function deleteSet(id) {
  return prisma.set.delete({
    where: { id: Number(id) },
  });
}