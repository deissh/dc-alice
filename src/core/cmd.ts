import { Message, Guild, TextChannel, User } from "discord.js";
import { Bot } from "./bot";

export interface ICommandEvent {
  self: Bot;
  channel: TextChannel;

  message: Message;
  args: string[];
  author: User;
  guild: Guild;
}

export abstract class IBaseCommand {
  public group: string = '';
  public title: string = '';
  public description: string = '';
  public usage: string = '';
  public aliases: string[] = [];

  public argsRegex?: RegExp;

  public cooldown?: number;
  public cooldownMessage?: string;

  // todo: this
  public needRoles?: string[];

  public abstract eval(event: ICommandEvent): Promise<void>;
}
