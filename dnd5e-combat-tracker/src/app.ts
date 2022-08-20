//libs
import "dotenv/config";
import express from "express";

//utils
import discordRequestValidator from "./utils/discordRequestValidator";
import loadGuildCommands from "./utils/loadGuildCommands";

//available commands
import { ALL_COMMANDS } from "./availableCommands";

//request handler
import requestHandler from "./requestHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  express.json({
    verify: discordRequestValidator(process.env.PUBLIC_KEY || ""),
  })
);

app.post("/interactions", requestHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  loadGuildCommands({
    appId: process.env.APP_ID || "",
    guildId: process.env.GUILD_ID || "",
    commands: ALL_COMMANDS,
  });
});
