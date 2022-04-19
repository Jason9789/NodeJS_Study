// @ts-check

// Template engine: Pug
// CSS framework: TailwindCSS

const Koa = require('koa')
const path = require('path')
const Pug = require('koa-pug')

const app = new Koa()

// @ts-ignore
// eslint-disable-next-line no-new
new Pug({
  viewPath: path.resolve(__dirname, './views'),
  app,
})

app.use(async (ctx) => {
  ctx.body = 'Hello World!'
  await ctx.render('main')
})

app.listen(8000)
