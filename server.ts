import "./models/db";
// tslint:disable-next-line: ordered-imports
import bodyParser from "body-parser";
import { config } from "dotenv";
import { renderFile } from "ejs";
import express from "express";
import session from "express-session";
import http from "http";
import homeRouter from "./routes/home";
import { expressWinstonLogger, logger } from "./utility/loggers";

config({ path: ".env" });
const app = express();
const port = process.env.PORT || 4000;
const server = new http.Server(app);

app.use("/static", express.static("static"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	session({
		resave: true,
		saveUninitialized: false,
		secret: process.env.SESSION_SECRET
	})
);
app.set("views", __dirname + "/views");
app.engine("html", renderFile);
app.set("view engine", "html");
app.use(expressWinstonLogger);

server.listen(port, () => {
	logger.info(`Server running on port ${port}`);
});

app.get('/robots.txt', (req, res) => {
	res.type('text/plain');
    res.sendFile(__dirname + "/views/robots.txt");
});

app.use("/", homeRouter);
