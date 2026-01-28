import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

console.log('DEBUG: DATABASE_URL loaded:', process.env.DATABASE_URL);

export default defineConfig({
  migrations: {
    seed: 'npx ts-node --esm prisma/seed_services.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
