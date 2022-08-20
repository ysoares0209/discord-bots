import { InteractionResponseType } from "discord-interactions";

const helloWorld = () => ({
  type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    content: `hello world! I'm a naughty bot`,
  },
});

export default helloWorld;
