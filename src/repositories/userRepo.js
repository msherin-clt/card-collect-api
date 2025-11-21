// src/repositories/userRepo.js
import prisma from '../config/db.js';

export async function createUser(data) {
  return prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
    },
  });
}

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
    },
  });
}

export async function updateUserProfile(id, data) {
  return prisma.user.update({
    where: { id: Number(id) },
    data,
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
    },
  });
}

// collection helpers (for later expansion if you want)
export async function getUserCollection(userId) {
  return prisma.userCardCollection.findMany({
    where: { userId },
    include: {
      card: true,
    },
  });
}

export async function addUserCollectionItem(userId, cardId, condition) {
  return prisma.userCardCollection.create({
    data: {
      userId,
      cardId,
      condition,
    },
  });
}
