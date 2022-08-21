import { InteractionResponseType } from "discord-interactions";

//types
import { StartTrackerProps } from "../types/commands";

//services
import createTracker from "../services/dynamodb/createTracker";
import disableExistingTracker from "../services/dynamodb/disableExistingTracker";

const startTracker = async ({
  guildId,
  channelId,
  userId,
}: StartTrackerProps) => {
  await disableExistingTracker({ guildId, channelId });
  const createdTracker = await createTracker({ channelId, guildId, userId });
  const responseContent = createdTracker.error
    ? `you rolled a 1! Something bad happened... (Error: tracker not created! - ${createdTracker.error}); email yansoaressilva@outlook.com to get support!`
    : `New tracker created!`;
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: responseContent,
    },
  };
};

export default startTracker;
