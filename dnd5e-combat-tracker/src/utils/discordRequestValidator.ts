import { verifyKey } from "discord-interactions";
import { Request, Response } from "express";

const discordRequestValidator = (clientKey: string) => {
  return function (req: Request, res: Response, buf: Buffer) {
    const discordSignatureHeader = "X-Signature-Ed25519";
    const discordSignatureTimestamp = "X-Signature-Timestamp";

    const reqSignature = req.get(discordSignatureHeader) as string;
    const reqTimestamp = req.get(discordSignatureTimestamp) as string;

    const isValidRequest = verifyKey(
      buf,
      reqSignature,
      reqTimestamp,
      clientKey
    );
    if (!isValidRequest) {
      res.status(401).send("Bad request signature");
      throw new Error("Bad request signature");
    }
  };
};

export default discordRequestValidator;
