const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
  result: Number,
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    ref: 'user',
    type: Schema.Types.ObjectId,
    required: true
  }
})

let WorkoutSchema = null
try {
  WorkoutSchema = mongoose.model('Workout', workoutSchema)
} catch (e) {
  WorkoutSchema = mongoose.model('Workout')
}
module.exports = WorkoutSchema
