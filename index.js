const { Telegraf, session } = require("telegraf")
require('dotenv').config()

const text = require('./const');

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
  const { first_name, id } = ctx.message.from
  console.log('Need registration')
  ctx.reply(`Welcome ${first_name || 'guest!'} - ${id}`)
})
bot.help((ctx) => ctx.reply(text.commands))

bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch().then(() => console.log('Bot started success...'))

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
