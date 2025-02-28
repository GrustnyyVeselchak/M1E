'use server'

import { SignupFormSchema, FormState } from "../lib/defenitions";
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { createSession } from '../lib/session';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database using Prisma
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return {
        message: 'An error occurred while creating your account.',
      };
    }

    // 4. Create user session
    await createSession(user.id.toString())
    
    } catch (error) {
    console.error('Error creating user:', error);
    return {
      message: 'An error occurred while creating your account.',
    };
  }
  // 5. Redirect user
  redirect('/')
}