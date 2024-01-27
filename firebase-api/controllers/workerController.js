"use strict";

const firebase = require("firebase");
const worker = require("../models/worker");
const firestore = firebase.firestore();

const addWorker = async (req, res, next) => {
	try {
		const data = req.body;
		const worker = await firestore.collection("people").doc().set(data);
		res.send("Record Saved Successfully!");
	} catch (error) {
		res.status(400).send(error.message);
	}
};
