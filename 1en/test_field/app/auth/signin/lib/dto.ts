/* import { User } from '@prisma/client';
import { getUser } from './dal';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Проверка, может ли текущий пользователь видеть имя пользователя
function canSeeUsername(viewer: User) {
  return true; // В данном примере все могут видеть имя пользователя
}

export async function getProfileDTO(slug: string) {
    // Получаем данные пользователя по slug
    const user = await prisma.user.findUnique({
      where: { slug }, // Предположим, что slug — это уникальное поле
      select: {
        id: true,
        username: true,
        phonenumber: true,
        team: true,
      },
    });
  
    if (!user) {
      return null; // Пользователь не найден
    }
  
    // Получаем текущего пользователя
    const currentUser = await getUser();
  
    if (!currentUser) {
      return null; // Текущий пользователь не аутентифицирован
    }
  
    // Возвращаем DTO с учетом прав доступа
    return {
      username: canSeeUsername(currentUser) ? user.username : null,
      phonenumber: canSeePhoneNumber(currentUser, user.team) ? user.phonenumber : null,
    };
  } */