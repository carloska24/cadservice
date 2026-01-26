import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

console.log('DEBUG: DATABASE_URL loaded:', process.env.DATABASE_URL);

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
