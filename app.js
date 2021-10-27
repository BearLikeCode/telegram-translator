'use strict';

require('dotenv').config()
const Bot = require('node-telegram-bot-api');
const { TranslationServiceClient } = require('@google-cloud/translate');

console.log(process.env.API_KEY);

const bot = new Bot(process.env.API_KEY, { polling: true });
const translationClient = new TranslationServiceClient();

async function translateText(text) {
    console.log(text);
    const request = {
        parent: `projects/${process.env.PROJECT_ID}/locations/${process.env.LOCATION}`,
        contents: [text],
        mimeType: 'text/plain', // mime types: text/plain, text/html
        sourceLanguageCode: 'ru',
        targetLanguageCode: 'en',
    };

    const [response] = await translationClient.translateText(request);
  
    for (const translation of response.translations) {
        console.log(`Translation: ${translation.translatedText}`);
    }
}

bot.onText(/\/print (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    translateText(match[1])
    const response = match[1];

    bot.sendMessage(chatId, response);
})