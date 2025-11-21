// src/service/collectionService.js
import {
  findCollectionByUserId,
  createCollectionItem,
} from '../repositories/collectionRepo.js';

export async function getUserCollection(userId) {
  if (!userId) {
    throw new Error('User ID is required to fetch collection');
  }
  return findCollectionByUserId(userId);
}

export async function addUserCollectionItem(userId, cardId, condition) {
  if (!userId) {
    throw new Error('User ID is required to add to collection');
  }
  if (!cardId) {
    const err = new Error('cardId is required');
    err.status = 400;
    throw err;
  }

  return createCollectionItem(userId, Number(cardId), condition ?? null);
}
