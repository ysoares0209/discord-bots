import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

//types
import { UpdateEntitiesProps } from "../../types/services";
import { Entities } from "../../types/dynamodb";

const updateEntities = async ({
  channelId,
  guildId,
  newEntities,
  newCurrentEntity,
}: UpdateEntitiesProps) => {
  try {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION || "",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });

    const command = new UpdateItemCommand({
      TableName: process.env.AWS_DYNAMO_TABLE_NAME,
      Key: {
        pk: { S: `guildId#${guildId}` },
        sk: { S: `channelId#${channelId}#active#true` },
      },
      ExpressionAttributeNames: {
        "#entities": "entities",
        "#currentEntity": "currentEntity",
      },
      ExpressionAttributeValues: {
        ":entities": { L: newEntities },
        ":currentEntity": newCurrentEntity,
      },
      UpdateExpression:
        "SET #entities = :entities, #currentEntity = :currentEntity",
      ReturnValues: "ALL_NEW",
    });
    const { Attributes } = await client.send(command);
    return { ok: true, updatedTracker: Attributes };
  } catch (error) {
    console.log("error updating entities", error);
    return { error: (error as Error).message };
  }
};

export default updateEntities;
