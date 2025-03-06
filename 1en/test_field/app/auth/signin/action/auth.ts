// app/auth/actions/auth.ts
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { encrypt } from '../../signup/lib/session';

const prisma = new PrismaClient();

export async function login(state: { message?: string }, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 1. Найти пользователя по email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { message: 'User not found' };
  }

  // 2. Проверить пароль
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { message: 'Invalid password' };
  }

  // 3. Создать сессию
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней
  await encrypt({ userId: user.id, expiresAt }); // Добавлено expiresAt

  // 4. Перенаправить на защищенную страницу
  redirect('/dashboard');
}