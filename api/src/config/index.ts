import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || `development`;

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error(`⚠️  Couldn't find .env file  ⚠️`);
}

export const AppConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
  logs: { level: process.env.LOG_LEVEL || `silly` },
  api: {
    prefix: `/api`,
  },
};
