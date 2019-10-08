import { config } from 'dotenv';
import * as path from 'path';
import log from './helpers/logger';

// загружаем переменные окружения
config({
  path: path.join(__dirname, '../.env'),
});

/**
 * Возвращяет значение из переменных окружения по его имени,
 * если нету то кидает ошибку
 * @param name {string} Название переменной
 */
const requireProcessEnv = (name: string): string => {
  if (!process.env[name]) {
    throw log.error(`You must set the ${name} environment variable`);
  }

  return process.env[name]!;
};

export default {
  env: process.env.NODE_ENV || 'development',
  bot_token: requireProcessEnv('BOT_TOKEN'),
};
