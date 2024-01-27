"use strict";

const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
	PORT,
	HOST,
	HOST_URL,
	apiKey,
	authDomain,
	projectId,
	storageBucket,
	messagingSenderId,
	appId,
} = process.env;

assert(PORT, "PORT is Required!");
assert(HOST, "HOST is Required!");

module.exports = {
	port: PORT,
	host: HOST,
	url: HOST_URL,
	firebaseConfig: {
		apiKey: apiKey,
		authDomain: authDomain,
		projectId: projectId,
		storageBucket: storageBucket,
		messagingSenderId: messagingSenderId,
		appId: appId,
	},
};
