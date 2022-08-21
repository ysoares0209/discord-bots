import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { CreateTrackerProps } from "../../types/services";

const createTracker = async ({
  channelId,
  guildId,
  userId,
}: CreateTrackerProps) => {
  try {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION || "",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
    const itemToSave = {
      pk: { S: `guildId#${guildId}` },
      sk: {
        S: `channelId#${channelId}#active#true`,
      },
      turn: { N: "1" },
      currentEntity: { S: "" },
      entities: { L: [] },
      createdBy: { S: userId },
    };
    const command = new PutItemCommand({
      Item: itemToSave,
      TableName: process.env.AWS_DYNAMO_TABLE_NAME,
    });
    await client.send(command);
    return { ok: true, item: itemToSave };
  } catch (error) {
    console.log("error saving tracker ", error);
    return { error: (error as Error).message };
  }
};

export default createTracker;
