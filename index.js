require('dotenv').config()
const mongoose = require('mongoose')
const { Telegraf, session } = require('telegraf')

const AuthMiddleware = require('./middleware/auth.middleware')
const AuthController = require('./controllers/auth.controller')
const StatController = require('./controllers/stat.controller')
const WorkoutController = require('./controllers/workout.controller')
const { stage } = require('./wizards')
const text = require('./const');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected success...'))
  .catch(e => console.error(e))

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(AuthMiddleware)
bot.use(session());
bot.use(stage.middleware())
bot.start(AuthController.auth)
bot.on('contact', AuthController.registration)

bot.on('callback_query', (ctx) => {
  console.log('callback_query');
  // Explicit usage
  ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

  // Using context shortcut
  ctx.answerCbQuery()
})

bot.on('inline_query', (ctx) => {
  console.log('inline_query');
  const result = []
  // Explicit usage
  ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

  // Using context shortcut
  ctx.answerInlineQuery(result)
})


bot.command('stat', StatController.getStat)
bot.command('add', WorkoutController.add)
bot.help((ctx) => ctx.reply(text.commands))
bot.launch().then(() => console.log('Bot started success...'))

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
