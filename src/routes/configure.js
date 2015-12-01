import express from 'express'
import logger from 'morgan'
import chalk from 'chalk'
import path from 'path'
import slack from 'slack-express'

let app = express()

// helpful local vars
app.locals.button = slack.button
app.locals.ok = true
app.locals.msg = ''

// local views
let views = path.join(__dirname, '..', 'views')
app.set('views', views)
app.set('view engine', 'ejs')

// middlewares
app.use(logger('dev'))

// helper for startup
app.start = function() {
  let port = process.env.PORT || 3000
  app.listen(port, x=> {
    if (process.env.NODE_ENV === 'development') {
      let msg = chalk.green.bold(`#!/bugbot>`)
      let url = chalk.underline.cyan(`http://localhost:${port}`)
      console.log(`${msg} ${url}`)
    }
  })
}

export default app
