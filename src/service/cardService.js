// src/service/cardService.js
import { Prisma } from '@prisma/client';
import {
  findAllCards,
  findCardById,
  createCard as createCardRepo,
  updateCard as updateCardRepo,
  deleteCard as deleteCardRepo,
} from '../repositories/cardRepo.js';

export async function getAllCards() {
  return findAllCards();
}

export async function getCard(id) {
  const card = await findCardById(id);
  if (!card) {
    const err = new Error('Card not found');
    err.status = 404;
    throw err;
  }
  return card;
}

export async function createCard(payload) {
  const { name, setId, number, variation, image_url } = payload;

  if (!name || !setId) {
    const err = new Error('name and setId are required');
    err.status = 400;
    throw err;
  }

  try {
    return await createCardRepo({
      name,
      setId: Number(setId),
      number: number ?? null,
      variation: variation ?? null,
      image_url: image_url ?? null,
    });
  } catch (error) {
    // P2003 = foreign key constraint (e.g. invalid setId)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
      const err = new Error('Invalid setId (referenced Set does not exist)');
      err.status = 400;
      throw err;
    }
    throw error;
  }
}

export async function updateCard(id, payload) {
  // Only allow certain fields to be updated
  const data = {};
  if (payload.name !== undefined) data.name = payload.name;
  if (payload.number !== undefined) data.number = payload.number;
  if (payload.variation !== undefined) data.variation = payload.variation;
  if (payload.image_url !== undefined) data.image_url = payload.image_url;
  if (payload.setId !== undefined) data.setId = Number(payload.setId);

  if (Object.keys(data).length === 0) {
    const err = new Error('No valid fields provided to update');
    err.status = 400;
    throw err;
  }

  try {
    return await updateCardRepo(id, data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        const err = new Error('Invalid setId (referenced Set does not exist)');
        err.status = 400;
        throw err;
      }
      if (error.code === 'P2025') {
        const err = new Error('Card not found');
        err.status = 404;
        throw err;
      }
    }
    throw error;
  }
}

export async function deleteCard(id) {
  try {
    await deleteCardRepo(id);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      const err = new Error('Card not found');
      err.status = 404;
      throw err;
    }
    throw error;
  }
}
