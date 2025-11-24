import prisma from '../config/db.js';

// Get all series
export async function findAllSeries() {
  return prisma.series.findMany({
    orderBy: { id: 'asc' },
  });
}

// Get a single series by ID (including all related sets)
export async function findSeriesById(id) {
  return prisma.series.findUnique({
    where: { id: Number(id) },
    include: {
      sets: true, // Assuming a 'sets' relationship exists on the Series model
    },
  });
}

// Create a new series
export async function createSeries(data) {
  return prisma.series.create({
    data,
    include: {
      sets: true,
    },
  });
}

// Update an existing series
export async function updateSeries(id, data) {
  return prisma.series.update({
    where: { id: Number(id) },
    data,
    include: {
      sets: true,
    },
  });
}

// Delete a series by ID
export async function deleteSeries(id) {
  return prisma.series.delete({
    where: { id: Number(id) },
  });
}