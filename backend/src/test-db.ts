import { prisma } from './Lib/prisma';

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Подключение к БД успешно');

    // Проверка таблицы Idea
    const count = await prisma.idea.count();
    console.log(`✅ Таблица Idea доступна. Записей: ${count}`);

    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка подключения:', error);
    process.exit(1);
  }
}

testConnection();
