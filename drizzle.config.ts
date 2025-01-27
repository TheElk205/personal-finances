import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    out: './drizzle',
    schema: './db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        user: process.env.DATABASE_USERNAME!,
        password: process.env.DATABASE_PASSWORD!,
    },
});