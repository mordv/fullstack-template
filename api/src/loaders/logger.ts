import winston from 'winston';
import { AppConfig } from '../config';

const transports = [
  new winston.transports.Console(
    process.env.NODE_ENV !== `development`
      ? { format: winston.format.combine(winston.format.cli(), winston.format.splat()) }
      : undefined
  ),
];

export const Logger = winston.createLogger({
  level: AppConfig.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: `YYYY-MM-DD HH:mm:ss`,
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports,
});
