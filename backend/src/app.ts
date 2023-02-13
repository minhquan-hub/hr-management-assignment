import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
