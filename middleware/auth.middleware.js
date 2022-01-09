const User = require('../models/user.model')
const AuthController = require('../controllers/auth.controller')
module.exports = async (ctx, next) => {
  const candidate = await User.findOne({ userId: ctx.message.from.id })
  if (candidate || ctx.message.contact) {
    ctx.state.user = candidate
    return next()
  }

  return await AuthController.auth(ctx)
}
