import {
  DynamoDBClient,
  DeleteItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { DisableExistingTrackerProps } from "../../types/services";

const disableExistingTracker = async ({
  guildId,
  channelId,
}: DisableExistingTrackerProps) => {
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });

  //delete current active item
  const deleteCommand = new DeleteItemCommand({
    TableName: process.env.AWS_DYNAMO_TABLE_NAME,
    Key: {
      pk: { S: `guildId#${guildId}` },
      sk: {
        S: `channelId#${channelId}#active#true`,
      },
    },
    ReturnValues: "ALL_OLD",
  });
  const { Attributes } = await client.send(deleteCommand);
  const completedItemToInsert = {
    ...Attributes,
    sk: {
      S: `channelId#${channelId}#active#false#completionDate#${new Date().toISOString()}`,
    },
  };

  //insert again deleted item but with different SK
  const putCommand = new PutItemCommand({
    Item: { ...completedItemToInsert },
    TableName: process.env.AWS_DYNAMO_TABLE_NAME,
  });
  await client.send(putCommand);
};

export default disableExistingTracker;
