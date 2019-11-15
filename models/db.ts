import { config } from "dotenv";
import mongoose from "mongoose";
import { logger } from "../utility/loggers";
export { Response } from "./response";

config({ path: ".env" });

mongoose.Promise = global.Promise;

mongoose.connect(
	process.env.MONGODB_URI,
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	err => {
		if (!err) {
			logger.info("MongoDB Connection Succeeded.");
		} else {
			logger.error(`Error in DB connection: ${err}`);
		}
	}
);
