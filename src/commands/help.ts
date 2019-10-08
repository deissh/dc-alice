import log from '../helpers/logger';
import { IBaseCommand, ICommandEvent } from '../core/cmd';
import { RichEmbed } from 'discord.js';


export default class CmdHelp implements IBaseCommand {
  public static group: string = 'global';
  public static title: string = 'help';
  public static description: string = 'Справка по командам';
  public static usage: string = 'help <cmd|all>';

  public static aliases: string[] = ['help', 'h'];

  public async eval(event: ICommandEvent): Promise<void> {
    log.info(event.message.content);

    const embed = new RichEmbed()
      .setAuthor('devOps')
      .setTitle('help cmd')
      .addField('Test', 123);

    event.channel.sendEmbed(embed);
  }
}
