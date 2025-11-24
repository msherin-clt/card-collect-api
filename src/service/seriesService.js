// src/service/seriesService.js
import { Prisma } from '@prisma/client';
import {
  findAllSeries,
  findSeriesById,
  createSeries as createSeriesRepo,
  updateSeries as updateSeriesRepo,
  deleteSeries as deleteSeriesRepo,
} from '../repositories/seriesRepo.js';

export async function getAllSeries() {
  return findAllSeries();
}

export async function getSeriesById(id) {
  const series = await findSeriesById(id);
  
  if (!series) {
    const err = new Error('Series not found');
    err.status = 404;
    throw err;
  }
  
  return series;
}

export async function createSeries(payload) {
  const { name, publisher } = payload;

  if (!name || !publisher) {
    const err = new Error('name and publisher are required');
    err.status = 400;
    throw err;
  }
  
  try {
    return await createSeriesRepo({
      name,
      publisher,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const err = new Error(`Series with name "${name}" already exists`);
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function updateSeries(id, payload) {
  const data = {};
  if (payload.name !== undefined) data.name = payload.name;
  if (payload.publisher !== undefined) data.publisher = payload.publisher;

  if (Object.keys(data).length === 0) {
    const err = new Error('No valid fields provided to update');
    err.status = 400;
    throw err;
  }

  try {
    return await updateSeriesRepo(id, data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        const err = new Error('Series not found');
        err.status = 404;
        throw err;
      }
      if (error.code === 'P2002') {
        const err = new Error('The updated series name already exists');
        err.status = 409;
        throw err;
      }
      if (error.code === 'P2003') {
        const err = new Error('Invalid publisher ID (referenced Publisher does not exist)');
        err.status = 400;
        throw err;
      }
    }
    throw error;
  }
}

export async function deleteSeries(id) {
  try {
    await deleteSeriesRepo(id);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      const err = new Error('Series not found');
      err.status = 404;
      throw err;
    }
    throw error;
  }
}