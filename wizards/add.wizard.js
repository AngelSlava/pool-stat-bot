const moment = require('moment');
const {Scenes, Markup} = require('telegraf');
const Workout = require('../models/workout.model')


const addWorkoutResult = new Scenes.WizardScene(
  'ADD_WORKOUT_RESULT',
  (ctx) => {
    console.log('step 1')

    ctx.wizard.state.workout = {}
    ctx.replyWithHTML('<b>Дата тренування:</b> (<i>напр: 22.01.2022 aбо 22</i>)',
      Markup.keyboard(['Today', 'Yesterday'], {
        columns: 2
      }).oneTime().resize());
    return ctx.wizard.next();
  },
  (ctx) => {
    console.log('step 2')


    const date = ctx.message.text.toLowerCase()
    if (date === 'cancel') {
      return ctx.scene.leave();
    }

    switch (date){
      case 'today':
        ctx.wizard.state.workout.date = moment().startOf('day').toDate()
        break
      case 'yesterday':
        ctx.wizard.state.workout.date = moment().subtract(1, 'day').startOf('day').toDate()
        break
      default:
        if (!moment(date, 'DD.MM.YYYY').isValid()) {
          ctx.reply('Wrong date!', Markup.keyboard(['Cancel'], {
            columns: 2
          }).oneTime().resize());
          return;
        }
        ctx.wizard.state.workout.date = moment(date, 'DD.MM.YYYY').startOf('day').toDate()
        break
    }

    const dateText = moment(ctx.wizard.state.workout.date).format('DD.MM.YYYY')
    ctx.replyWithHTML(`Workout date: <b>${dateText}</b> ?`, Markup.keyboard(['Yes', 'No'], {
      columns: 2
    }).oneTime().resize());
    return ctx.wizard.next();
  },
  (ctx) => {
    console.log('step 3')


    const success = ctx.message.text.toLowerCase() === 'yes'
    if (!success) {
      ctx.reply('Type the date');
      return ctx.wizard.back()
    }
    ctx.replyWithHTML('<b>Enter your result</b> \nExample: 2.5');
    return ctx.wizard.next();

  },
  async (ctx) => {
    console.log('step 4')


    const distance = ctx.message.text
    if (isNaN(distance)) {
      ctx.reply('Type only numbers!');
      return;
    }

    ctx.wizard.state.workout.result = +distance;

    const user = ctx.state.user._id;
    const {result, date} = ctx.wizard.state.workout

    const data = {
      user,
      result,
      date
    }

    const candidate = await Workout.findOne({user, date})
    if (!candidate) {
      const workout = new Workout(data)
      await workout.save()
    } else {
      candidate.result = result
      await candidate.save()
    }
    ctx.reply('Result saved!');
    return ctx.scene.leave();
  }
)

module.exports.addWorkoutResult = addWorkoutResult
