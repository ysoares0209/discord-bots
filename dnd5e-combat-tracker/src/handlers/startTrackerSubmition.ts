import { InteractionResponseType } from "discord-interactions";

//types
import { StartTrackerSubmitionProps } from "../types/handlers";

//services
import createTracker from "../services/dynamodb/createTracker";

const startTrackerSubmition = async ({
  components,
  member,
  channelId,
  guildId,
}: StartTrackerSubmitionProps) => {
  const submittedValue = components[0].components[0].value;
  const userId = member.user.id;
  const createdTracker = await createTracker({
    trackerName: submittedValue,
    channelId,
    guildId,
    userId,
  });
  const responseContent = createdTracker.error
    ? `you rolled a 1! Something bad happened... (Error: tracker not created! - ${createdTracker.error}); email yansoaressilva@outlook.com to get support!`
    : `Tracker "${submittedValue}" sucessfully created!`;
  const response = {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: responseContent,
    },
  };
  return response;
};

export default startTrackerSubmition;
