// @ts-check

// Template engine: Pug
// CSS framework: TailwindCSS

const Koa = require('koa')
const route = require('koa-route')
const websockify = require('koa-websocket')
const serve = require('koa-static')
const mount = require('koa-mount')
const path = require('path')
const Pug = require('koa-pug')

const app = websockify(new Koa())

// @ts-ignore
// eslint-disable-next-line no-new
new Pug({
  viewPath: path.resolve(__dirname, './views'),
  app,
})

app.use(mount('/public', serve('src/public')))

app.use(async (ctx) => {
  await ctx.render('main')
})

app.ws.use(
  route.all('/ws', (ctx) => {
    ctx.websocket.on('message', (data) => {
      // console.log(`${message}`)
      if (typeof data !== 'object') {
        console.log('RETURN')
        return
      }

      // @ts-ignore
      const { message, nickname } = JSON.parse(data)

      const { server } = app.ws

      if (!server) {
        return
      }

      server.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            message,
            nickname,
          })
        )
      })
    })
  })
)

app.listen(8000)
