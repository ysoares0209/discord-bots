import { Command } from "../availableCommands";
import buildDiscordRequest from "./buildDiscordRequest";

interface LoadGuildCommands {
  appId: string;
  guildId: string;
  commands: Array<Command>;
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
    for await (const command of commands) {
      const result = await buildDiscordRequest({
        endpoint,
        options: { method: "GET" },
      });
      const data = (await result.json()) as Array<unknown>;
      console.log(data);
      if (data.length) {
        console.log(`Command ${command.name} already installed... proceed`);
        continue;
      }
      console.log(`Command ${command.name} is not installed... installing`);
      await buildDiscordRequest({
        endpoint,
        options: { method: "POST", body: JSON.stringify(command) },
      });
      console.log("Command installed!");
    }
  } catch (error) {
    console.log(error);
    return { error: (error as Error).message };
  }
};

export default loadGuildCommands;
