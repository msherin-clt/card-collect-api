// src/repositories/collectionRepo.js
import prisma from '../config/db.js';

// Get all collection entries for a user
export async function findCollectionByUserId(userId) {
  return prisma.userCardCollection.findMany({
    where: { userId },
    include: {
      card: {
        include: {
          set: {
            include: {
              series: true,
            },
          },
        },
      },
    },
    orderBy: { id: 'asc' },
  });
}

// Add a card to the user's collection
export async function createCollectionItem(userId, cardId, condition = null) {
  return prisma.userCardCollection.create({
    data: {
      userId,
      cardId,
      condition,
    },
    include: {
      card: {
        include: {
          set: {
            include: {
              series: true,
            },
          },
        },
      },
    },
  });
}
