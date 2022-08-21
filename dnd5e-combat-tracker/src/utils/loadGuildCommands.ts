import { Command } from "../availableCommands";
import buildDiscordRequest from "./buildDiscordRequest";

interface LoadGuildCommands {
  appId: string;
  guildId: string;
  commands: Array<Command>;
}

interface GuildCommand {
  id: string;
  application_id: string;
  version: string;
  default_permission: boolean;
  default_member_permissions: unknown;
  type: number;
  name: string;
  description: string;
  guild_id: string;
}

const loadGuildCommands = async ({
  appId,
  guildId,
  commands,
}: LoadGuildCommands) => {
  try {
    if (!appId || !guildId) {
      throw Error("Could not find required envs!");
    }
    const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
    const allGuildCommands = (await buildDiscordRequest({
      endpoint,
      options: { method: "GET" },
    }).then((result) => result.json())) as Array<GuildCommand>;
    const installedCommands = allGuildCommands.map(
      (guildCommands) => guildCommands.name
    );
    const commandsToInstall = commands.filter(
      (command) => !installedCommands.includes(command.name)
    );
    console.log(`installed commands: ${installedCommands.join(",")}`);
    console.log(
      `commands to install: ${commandsToInstall
        .map((command) => command.name)
        .join(",")}`
    );
    for await (const command of commandsToInstall) {
      await buildDiscordRequest({
        endpoint,
        options: { method: "POST", body: JSON.stringify(command) },
      });
    }
    console.log("All commands installed!");
  } catch (error) {
    console.log(error);
    return { error: (error as Error).message };
  }
};

export default loadGuildCommands;
