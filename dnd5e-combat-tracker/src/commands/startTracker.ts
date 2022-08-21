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
  const generateResponse = (error: string) => {
    const responseContent = error
      ? `you rolled a 1! Something bad happened... (Error: tracker not created! - ${error}); email yansoaressilva@outlook.com to get support!`
      : `New tracker created!`;
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: responseContent,
      },
    };
  };

  const { error } = await disableExistingTracker({ guildId, channelId });
  if (error) {
    return generateResponse(error);
  }
  const createdTracker = await createTracker({ channelId, guildId, userId });
  return generateResponse(createdTracker.error || "");
};

export default startTracker;
