import fetch from "node-fetch";

interface BuildDiscordRequestProps {
  endpoint: string;
  options?: {
    body?: string; //body MUST come as a stringfied json
    [key: string]: unknown;
  };
}

const buildDiscordRequest = async ({
  endpoint,
  options,
}: BuildDiscordRequestProps) => {
  const url = "https://discord.com/api/v10/" + endpoint;
  const result = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json; charset=UTF-8",
      "User-Agent":
        "DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)",
    },
    ...options,
  });
  if (!result.ok) {
    const data = await result.json();
    throw new Error(JSON.stringify(data));
  }
  return result;
};

export default buildDiscordRequest;
