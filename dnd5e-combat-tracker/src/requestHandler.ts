import { Request, Response } from "express";
import { InteractionType, InteractionResponseType } from "discord-interactions";

//types
import { Member } from "./types/discord";

//commands
import helloWorldCommand from "./commands/helloWorld";
import startTrackerCommand from "./commands/startTracker";
import addCharacterCommand from "./commands/addCharacter";

const requestHandler = async (req: Request, res: Response) => {
  const { type, data, channel_id, guild_id, member } = req.body;

  //request validation
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  //commands handler
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name: commandName } = data as { name: string };
    const userId = (member as Member).user.id;

    const result = await (async () => {
      if (commandName === "test") return helloWorldCommand();
      if (commandName === "start-tracker") {
        const response = await startTrackerCommand({
          channelId: channel_id,
          guildId: guild_id,
          userId,
        });
        return response;
      }
      if (commandName === "add-character") {
        const response = await addCharacterCommand({
          guildId: guild_id,
          channelId: channel_id,
          options: data.options,
        });
        return response;
      }
    })();
    res.send(result);
  }
};

export default requestHandler;
