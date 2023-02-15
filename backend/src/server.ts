import "reflect-metadata";
import dotenv from "dotenv";
import mongoose, { MongooseOptions } from "mongoose";
import { InversifyExpressServer } from "inversify-express-utils";

import app from "./app";
import logger from "./ultils/logger";
import container from "./config/inversify.config";
import "./controllers/user_controller";
import "./controllers/auth_controller";
import "./controllers/team_controller";

dotenv.config();
const port = process.env.PORT || 5002;
let server = new InversifyExpressServer(
  container,
  null,
  { rootPath: "/api" },
  app
);

const uri = process.env.MONGODB_URL;

mongoose.set("strictQuery", true);
mongoose
  .connect(String(uri), {
    useNewUrlParser: true,
  } as MongooseOptions)
  .then(() => {
    console.log("Connected to MongooDB");
    logger.info("Connected to MongooDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongooDB");
    logger.error("Failed to connect to MongooDB");
  });

let appConfigured = server.build();
appConfigured.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
