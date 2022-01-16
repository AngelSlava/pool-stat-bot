const {Scenes} = require('telegraf');
const {addWorkoutResult} = require('./add.wizard')

module.exports.stage = new Scenes.Stage([addWorkoutResult])
