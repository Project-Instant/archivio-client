import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import * as path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

export default defineConfig({
  out: './',
  schema: './schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});