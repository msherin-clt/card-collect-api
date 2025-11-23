// src/service/userService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';
import { createUser, findUserByEmail } from '../repositories/userRepo.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

function buildTokenPayload(user) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
}

function generateToken(user) {
  const payload = buildTokenPayload(user);
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export async function signUp(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);

    return {
      user,
      token,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        const err = new Error('Email already in use');
        err.status = 409;
        throw err;
      }
      if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
        const err = new Error('Username already in use');
        err.status = 409;
        throw err;
      }
    }
    throw error;
  }
}

export async function login(email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    token,
  };
}
