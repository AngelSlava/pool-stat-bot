const User = require('../models/user.model')
module.exports.auth = async (ctx) => {
  try {
    if (ctx.state.user) {
      return await ctx.reply(`Hi ${ctx.state.user.firstName}`)
    }

    await ctx.replyWithHTML('Для продовження, натисніть: <b>"Відправити номер телефону"</b>', {
      reply_markup: {
        keyboard: [
          [
            {
              text: "📲 Send phone number",
              request_contact: true,
            },
          ],
        ],
        one_time_keyboard: true,
        resize_keyboard: true
      },
    })
  } catch (e) {
    console.error(e)
  }
}

module.exports.registration = async (ctx) => {
  try {
    if (ctx.state.user) {
      return await ctx.reply(`Hi ${ctx.state.user.firstName}`)
    }
    const { phone_number: phone, first_name: firstName, last_name: lastName, user_id: userId } = ctx.message.contact
    const user = new User({ userId, phone, firstName, lastName })
    await user.save()
    await ctx.reply('Account created success')
  } catch (e) {
    console.error(e)
  }
}
