"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const { db } = require("./firebase");

const app = express();

app.use(express.json());
app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Firebase Basic App");
});

app.post("/add", async (req, res) => {
	const { name, status } = req.body;
	const peopleRef = db.collection("people").doc("worker");
	const result = await peopleRef.set({
		[name]: status,
	});
	res.status(200).send(result);
});

app.listen(config.port, () => {
	console.log(`App is listening at ${config.url}`);
});
