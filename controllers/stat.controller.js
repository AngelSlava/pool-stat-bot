const Workout = require('../models/workout.model')
module.exports.getStat = async (ctx) => {
  try {
    const user = ctx.state.user._id
    const count = await Workout.find({ user }).countDocuments()
    const last = await Workout.findOne({ user }, {}, { sort: { 'date' : -1 } })
    const [{result}] = await Workout.aggregate([
      { $match: { user } },
      { $group: { _id: null, result: { $sum: "$result" } } }
    ])
    ctx.replyWithHTML(`
<b>DAY: ${count} / 144
TODAY: ${last.result} KM
TOTAL: ${result} / 365 KM
</b>
`)
  } catch (e) {
    console.error(e)
  }
}
