import { Client, Message, TextChannel, Guild } from 'discord.js';

import config from '../config';
import log from '../helpers/logger';

import CmdHelp from '../commands/help';
import { IBaseCommand } from './cmd';

export class Bot extends Client {
  /**
   * Список загруженных команд
   * @public
   * @type {Map<string, any>}
   */
  public commands: Map<string, IBaseCommand> = new Map();

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

    // fixme
    this.commands.set(CmdHelp.aliases[0], new CmdHelp);

    this
      .on('error', log.error)
      .on('warn', log.warn)
      // Live time hooks
      .on('ready', this.onUp)
      .on('disconnect', this.onDown)
      .on('message', this.onMessage);

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

  /**
   * Хук срабатывает если пришло сообщение
   * @async
   * @private
   */
  private async onMessage(message: Message) {
    // todo: поддержка всех типов каналов
    if (message.channel.type !== 'text') { return; }
    // игнорим сообщения от ботов
    if (message.author.bot) { return; }
    // игнорим не команды с префиксом
    if (!message.content.startsWith(this.prefix)) { return; }

    const channel: TextChannel = message.channel as TextChannel;
    const guild: Guild = channel.guild;

    // todo: refactoring
    const command: string = message.content.split(" ")[0].replace(this.prefix, '');
    if (this.commands.has(command)) {
      const cmd: IBaseCommand = this.commands.get(command)!;
      // todo: verifications and validations

      // todo: parse args by regex
      const args: string[] = message.content.split(" ").slice(1);

      cmd.eval({
        client: this,
        author: message.author,
        channel,
        message,
        guild,
        args,
      });
    }
  }
}
