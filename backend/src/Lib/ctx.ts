import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  // eslint-disable-next-line no-process-env
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const createAppContext = () => {
  const prisma = new PrismaClient({ adapter });
  return {
    prisma,
    stop: async () => {
      await prisma.$disconnect();
    },
  };
};

export type AppContext = ReturnType<typeof createAppContext>;
