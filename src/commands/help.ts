import log from '../helpers/logger';
import { IBaseCommand, ICommandEvent } from '../core/cmd';
import { RichEmbed } from 'discord.js';


export default class CmdHelp implements IBaseCommand {
  public group: string = 'global';
  public title: string = 'help';
  public description: string = 'Справка по командам';
  public usage: string = 'help <cmd|all>';

  public aliases: string[] = ['help', 'h'];

  public async eval({ self, channel }: ICommandEvent): Promise<void> {

    const embed = new RichEmbed()
      .setTitle('Список команд');

    self.commands.forEach((cmd) => {
      embed.addField(cmd.title, [cmd.description, cmd.usage]);
    });

    channel.sendEmbed(embed);
  }
}
