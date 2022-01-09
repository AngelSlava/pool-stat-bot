const mongoose = require('mongoose')
const { Telegraf } = require("telegraf")
require('dotenv').config()

const AuthMiddleware = require('./middleware/auth.middleware')
const AuthController = require('./controllers/auth.controller')
const StatController = require('./controllers/stat.controller')

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conected success...'))
  .catch(e => console.error(e))

const text = require('./const');
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(AuthMiddleware)
bot.start(AuthController.auth)
bot.on('contact', AuthController.registration)
bot.command('stat', StatController.getStat)
bot.help((ctx) => ctx.reply(text.commands))
bot.launch().then(() => console.log('Bot started success...'))

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
