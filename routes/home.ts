import { Router } from "express";
import { Response } from "../models/db";
import { sendMail } from "../tools/sendMail";
import { logger } from "../utility/loggers";

const router = Router();

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

router.get("/", async (req, res) => {
	res.render('index');
});

router.post("/submit", async (req, res) => {
	const { name, email, subject, message } = req.body;

	if (validateEmail(email) === false) {
		return res.status(400).json({
			success: false,
			message: "invalidEmail",
		});
	}

	const response = new Response({
		name, email, subject, message
	});

	await response.save();

	sendMail(name, email, subject, message);

	return res.json({
		success: true,
		message: "submissionSuccess",
	});
});


// logger.log("info", "Custom level");
// logger.error("error");
// logger.warn("warn");
// logger.info("info");
// logger.verbose("verbose");
// logger.debug("debug");
// logger.silly("silly");

export default router;
