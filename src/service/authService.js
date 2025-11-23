import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../respositories/userRepo.js';
import { Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export async function signUp(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
    try{    
        const newUser = await createUser({username: username, email: email, password: hashedPassword});
        return newUser;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
        {
            if (error.code === 'P2002' && error.meta.target.includes('email')) {
                const error = new Error('Email already in use');
                error.status = 409;
                throw error;
            }
            throw error;
        }
    }
}