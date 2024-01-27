const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const express = require("express");

const token = `${process.env.API}`;
const port = process.env.PORT;

const app = express();
// Create a bot that uses your token
const bot = new TelegramBot(token, { polling: true });

// Listen for commands
bot.onText(/\/start/, (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, "Hello! Welcome to my bot.");
});

bot.onText(/\/open/, (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, "Opening...");
});

bot.onText(/\/close/, (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, "Closing...");
});

bot.onText(/\/clear/, (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, "Clearing...");
});

// Listen for any kind of message
bot.on("message", (msg) => {
	const chatId = msg.chat.id;

	// Respond to 'hello' or 'hi'
	if (
		msg.text.toString().toLowerCase().indexOf("hello") === 0 ||
		msg.text.toString().toLowerCase().indexOf("hi") === 0 ||
		msg.text.toString().toLowerCase().indexOf("hey") === 0
	) {
		bot.sendMessage(chatId, "Hello!, Welcome.");
	}
});

app.listen(port, function listen() {
	console.log(`Server is listening at http://localhost:${port}`);
});
