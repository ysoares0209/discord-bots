import { Request, Response } from "express";
import { InteractionType, InteractionResponseType } from "discord-interactions";

//commands
import helloWorldCommand from "./commands/helloWorld";
import startTrackerCommand from "./commands/startTracker";

//handler
import startTrackerSubmition from "./handlers/startTrackerSubmition";

//custom ids
const newTracker = "new-tracker";

const requestHandler = async (req: Request, res: Response) => {
  const { type, data } = req.body;

  //request validation
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  //commands handler
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name: commandName } = data as { name: string };
    const result = (() => {
      if (commandName === "test") return helloWorldCommand();
      if (commandName === "start-tracker") {
        return startTrackerCommand(newTracker);
      }
    })();
    res.send(result);
  }

  if (type === InteractionType.APPLICATION_MODAL_SUBMIT) {
    const { custom_id, components } = data;
    if (custom_id === newTracker) {
      const { member, guild_id, channel_id } = req.body;
      const result = await startTrackerSubmition({
        components,
        member,
        channelId: channel_id,
        guildId: guild_id,
      });
      res.send(result);
    }
  }
};

export default requestHandler;
