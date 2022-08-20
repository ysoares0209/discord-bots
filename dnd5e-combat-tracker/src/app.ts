//libs
import "dotenv/config";
import express from "express";

//utils
import discordRequestValidator from "./utils/discordRequestValidator";

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
});
