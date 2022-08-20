import { Request, Response } from "express";
import { InteractionType, InteractionResponseType } from "discord-interactions";

//commands
import helloWorldCommand from "./commands/helloWorld";

const requestHandler = async (req: Request, res: Response) => {
  const { type, data } = req.body;

  //request validation
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data as { name: string };

    if (name === "test") {
      const result = helloWorldCommand();
      res.send(result);
    }
  }
};

export default requestHandler;
