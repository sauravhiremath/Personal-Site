import config from 'dotenv';
import expressWinston from 'express-winston';
import winston from 'winston';

const winstonLevels = {		
	// Can be passed to statusLevels if you want to customise. This is default right now.
	error: 0,
	warn: 1,
	info: 2,
	verbose: 3,
	debug: 4,
	silly: 5
};

const logLevel = process.env.NODE_ENV === "production" ? "verbose" : "debug";
const expressLogLevel = process.env.NODE_ENV === "production" ? "verbose" : "debug";

const logger = winston.createLogger({
	transports: [new winston.transports.Console({ level: logLevel })],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.simple()
	)
});

const expressWinstonLogger = expressWinston.logger({
	transports: [new winston.transports.Console({ level: expressLogLevel })],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.simple()
	),
	msg(req, res) {
		if (req) {
			// TODO: Customise this message to add req.whatever properties relevant to users
			return "{{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms";
		}
		else {
			return "{{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms";
		}
	},
	colorize: true,

	meta: false,

	level(req, res) {
		let level = "";
		if (res.statusCode >= 100) {
			level = "verbose";
		}
		if (res.statusCode >= 400) {
			level = "warn";
		}
		if (res.statusCode >= 500) {
			level = "error";
		}
		return level;
	}
});

export {
	logger,
	expressWinstonLogger
}