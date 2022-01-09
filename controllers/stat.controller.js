module.exports.getStat = async (ctx) => {
  try {
    await ctx.reply(`Stat replay`)
  } catch (e) {
    console.error(e)
  }
}
