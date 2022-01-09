const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userId: {
    type: Number,
    unique: true,
    required: true
  },
  phone: {
    type: Number,
    unique: true,
    required: true
  },
  firstName: String,
  lastName: String,
  active: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})

let UserSchema = null
try {
  UserSchema = mongoose.model('User', userSchema)
} catch (e) {
  UserSchema = mongoose.model('User')
}
module.exports = UserSchema
