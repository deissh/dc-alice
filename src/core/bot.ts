import { Client } from 'discord.js';

import config from '../config';
import log from '../helpers/logger';

export class Bot extends Client {
  /**
   * Список загруженных команд
   * @public
   * @type {Map<string, any>}
   */
  public commands: Map<string, any> = new Map();

  /**
   * Префикс команд, по умолчанию равен !
   * @public
   * @type {string}
   */
  public prefix: string = '!';

  constructor() {
    super();
  }

  /**
   * Иницилизация бота и всех его зависимостей
   * @async
   * @public
   */
  public async init(): Promise<string> {
    log.info('Иницилизируем бота');
    // todo: загрузка команд

    this
      .on('error', log.error)
      .on('warn', log.warn)
      // Live time hooks
      .on('ready', this.onUp)
      .on('disconnect', this.onDown);

    // запускаем самого бота после всех настроек и загрузок
    return this.login(config.bot_token);
  }

  /**
   * Хук срабатывает после того как бот был запущен и подключился к серверу
   * @async
   * @private
   */
  private async onUp() {
    log.info('Бот запустился');
    return;
  }

  /**
   * Хук срабатывает если бот отключился
   * @async
   * @private
   */
  private async onDown() {
    log.error('Бот упал');
    return;
  }
}
