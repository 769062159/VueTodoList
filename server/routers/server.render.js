const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['content-Type'] ='text/html'

  const context = {url: ctx.path}

  try{
    const appString = await renderer.renderToString(context)

    const html = ejs.render(template, {
      appString,
      style: context.renderScripts(),
      scripts: context.renderScripts()
    })

    ctx.body = html
  }catch(err){
    console.log(err)
    throw err
  }
}
