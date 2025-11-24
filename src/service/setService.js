import { Prisma } from '@prisma/client';
import {
  findAllSets,
  findSetById,
  createSet as createSetRepo,
  updateSet as updateSetRepo,
  deleteSet as deleteSetRepo,
} from '../repositories/setRepo.js';

export async function getAllSets() {
  return findAllSets();
}

export async function getSetById(id) {
  const set = await findSetById(id);
  if (!set) {
    const err = new Error('Set not found');
    err.status = 404;
    throw err;
  }
  return set;
}

export async function createSet(payload) {
  const { name, seriesId } = payload;

  if (!name || !seriesId) {
    const err = new Error('name and seriesId are required');
    err.status = 400;
    throw err;
  }

  try {
    return await createSetRepo({
      name,
      seriesId: Number(seriesId),
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
      const err = new Error('Invalid seriesId (referenced Series does not exist)');
      err.status = 400;
      throw err;
    }
    throw error;
  }
}

export async function updateSet(id, payload) {
  const data = {};
  if (payload.name !== undefined) data.name = payload.name;
  if (payload.seriesId !== undefined) data.seriesId = Number(payload.seriesId);

  if (Object.keys(data).length === 0) {
    const err = new Error('No valid fields provided to update');
    err.status = 400;
    throw err;
  }

  try {
    return await updateSetRepo(id, data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        const err = new Error('Invalid seriesId (referenced Series does not exist)');
        err.status = 400;
        throw err;
      }
      if (error.code === 'P2025') {
        const err = new Error('Set not found');
        err.status = 404;
        throw err;
      }
    }
    throw error;
  }
}

export async function deleteSet(id) {
  try {
    await deleteSetRepo(id);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      const err = new Error('Set not found');
      err.status = 404;
      throw err;
    }
    throw error;
  }
}