const TelegramBot = require('node-telegram-bot-api');

const token = '6085517165:AAHnXVjS4_HZ2_p7b6pe1K01BeofpG8Borc';

const bot = new TelegramBot(token, { polling: true });

const opts = {
  main: {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Світло',
            callback_data: 'light',
          },
          {
            text: 'Пари',
            callback_data: 'pary',
          },
        ],
      ],
    },
  },

  light: {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Група 1',
            callback_data: 'group1',
          },
          {
            text: 'Група 2',
            callback_data: 'group2',
          },
          {
            text: 'Група 3',
            callback_data: 'group3',
          },
          {
            text: 'Головна',
            callback_data: 'main',
          },
        ],
      ],
    },
  },

  pary: {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Лекційні',
            callback_data: 'lec',
          },
          {
            text: 'Практичні',
            callback_data: 'prac',
          },
          {
            text: 'Головна',
            callback_data: 'main',
          },
        ],
      ],
    },
  },
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Я можу давати тобі графіки груп світла та розклад твоїх пар', opts.main);
});

bot.on('callback_query', (callbackQuery) => {
  const action = callbackQuery.data;
  const chatId = callbackQuery.message.chat.id;
  if (action === 'light') {
    bot.sendMessage(chatId, 'Виберіть групу', opts.light);
  } else if (action === 'main') {
    bot.sendMessage(
      chatId,
      'Я можу давати тобі графіки груп світла та розклад твоїх пар',
      opts.main,
    );
  } else if (action === 'group1') {
    bot.sendPhoto(chatId, 'img/l1.jpg', opts.light).catch((error) => {
      console.log(error);
    });
  } else if (action === 'group2') {
    bot.sendPhoto(chatId, 'img/l2.png', opts.light).catch((error) => {
      console.log(error);
    });
  } else if (action === 'group3') {
    bot.sendPhoto(chatId, 'img/l3.png', opts.light).catch((error) => {
      console.log(error);
    });
  } else if (action === 'pary') {
    bot.sendMessage(chatId, 'Виберіть пари', opts.pary).catch((error) => {
      console.log(error);
    });
  } else if (action === 'lec') {
    bot.sendPhoto(chatId, 'img/paryL.jpg', opts.pary).catch((error) => {
      console.log(error);
    });
  } else if (action === 'prac') {
    bot.sendPhoto(chatId, 'img/paryP.jpg', opts.pary).catch((error) => {
      console.log(error);
    });
  }
});
