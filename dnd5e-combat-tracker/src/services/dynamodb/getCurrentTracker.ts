import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { GetCurrentTrackerProps } from "../../types/services";

const getCurrentTracker = async ({
  channelId,
  guildId,
}: GetCurrentTrackerProps) => {
  try {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION || "",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
    const command = new GetItemCommand({
      TableName: process.env.AWS_DYNAMO_TABLE_NAME,
      Key: {
        pk: { S: `guildId#${guildId}` },
        sk: { S: `channelId#${channelId}#active#true` },
      },
    });
    const { Item } = await client.send(command);
    return { ok: true, item: Item };
  } catch (error) {
    console.log("error retrieving current track", error);
    return { error: (error as Error).message };
  }
};

export default getCurrentTracker;
