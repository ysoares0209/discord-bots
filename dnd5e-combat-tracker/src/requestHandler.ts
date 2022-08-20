import { Request, Response } from "express";
import { InteractionType, InteractionResponseType } from "discord-interactions";

const requestHandler = async (req: Request, res: Response) => {
  const { type } = req.body;

  //request validation
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }
};

export default requestHandler;
