import log from './helpers/logger';
import { Bot } from './core/bot';

// запускаем бота
const bot = new Bot();
(async _ => bot.init())();
