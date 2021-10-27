const Bot = require('node-telegram-bot-api');
const API_KEY = '2073969027:AAH2pcMYkHYpxBYI9cyBRLP9du_Gmq-01NI';
const bot = new Bot(API_KEY, { polling: true });

bot.onText(/\/print (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const response = match[1];

    bot.sendMessage(chatId, response);
})