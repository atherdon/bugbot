import express from 'express'
import logger from 'morgan'
import path from 'path'
import session from 'express-session'

// create a brand new express app
let app = express()

function auth(req, res, next) {
  if (req.session.account) {
    app.locals.isLoggedIn = true
  }
  else {
    app.locals.isLoggedIn = false
  }
  next()
}
 
app.locals.client_id = process.env.SLACK_CLIENT_ID

// setup some local views
let views = path.join(__dirname, 'views')
app.set('views', views)
app.set('view engine', 'ejs')

// mount our slash command app
app.use(logger('dev'))
app.use(session({secret:'?bQ^3K9c93kLvrKX2{TpV^CN', cookie:{maxAge:60000}}))
app.use(auth)

export default app
