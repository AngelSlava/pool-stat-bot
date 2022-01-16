module.exports.add = ctx => {
  ctx.scene.enter('ADD_WORKOUT_RESULT').then(() => {
    console.log('Workout add success!')
  })
}
