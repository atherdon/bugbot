import slack from './slack'
import routes from './routes'
import app from './config'
import index from './routes/index'
import auth from './routes/auth'

// slack routes
app.use('/bugbot', slack)

// http routes
app.get('/', index)
app.get('/bugbot/github/auth', auth)

if (require.main === module) {
  app.start()
}

export default app
