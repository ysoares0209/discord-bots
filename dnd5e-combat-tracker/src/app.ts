//libs
import "dotenv/config";
import express from "express";

//utils
import discordRequestValidator from "./utils/discordRequestValidator";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  express.json({
    verify: discordRequestValidator(process.env.PUBLIC_KEY || ""),
  })
);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
