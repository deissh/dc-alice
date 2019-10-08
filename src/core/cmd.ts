import { Client, Message, Guild, TextChannel, User } from "discord.js";

export interface ICommandEvent {
  client: Client;
  channel: TextChannel;

  message: Message;
  args: string[];
  author: User;
  guild: Guild;
}

export abstract class IBaseCommand {
  public static group: string;
  public static title: string;
  public static description: string;
  public static usage: string;
  public static aliases: string[];

  public static argsRegex?: RegExp;

  public static cooldown?: number;
  public static cooldownMessage?: string;

  // todo: this
  public static needRoles?: string[];

  public abstract eval(event: ICommandEvent): Promise<void>;
}
