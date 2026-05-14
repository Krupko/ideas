import { createAppContext } from './Lib/ctx';

async function testConnection() {
  const ctx = createAppContext();
  try {
    await ctx.prisma.$connect();
    console.log('✅ Подключение к БД успешно');

    // Проверка таблицы Idea
    const count = await ctx.prisma.idea.count();
    console.log(`✅ Таблица Idea доступна. Записей: ${count}`);

    await ctx.prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка подключения:', error);
    await ctx.prisma.$disconnect();
    process.exit(1);
  }
}

testConnection();
