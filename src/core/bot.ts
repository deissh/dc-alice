import { Client } from 'discord.js';

import config from '../config';
import log from '../helpers/logger';

export class Bot extends Client {
  /**
   * @public
   * @description Список загруженных команд
   * @type {Map<string, any>}
   */
  public commands: Map<string, any> = new Map();

  /**
   * @public
   * @description Префикс команд, по умолчанию равен !
   * @type {string}
   */
  public prefix: string = '!';

  constructor() {
    super();
  }

  public async init() {
    log.info('Иницилизируем бота');
    // todo: загрузка команд

    this.on('error', log.error)
      .on('warn', log.warn)
      .on('disconnect', log.info);

    // запускаем самого бота после всех настроек и загрузок
    await this.login(config.bot_token);
  }
}
