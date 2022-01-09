const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})

let WorkoutSchema = null
try {
  WorkoutSchema = mongoose.model('Workout', workoutSchema)
} catch (e) {
  WorkoutSchema = mongoose.model('Workout')
}
module.exports = UserSchema
