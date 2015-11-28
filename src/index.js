import slack from './slack'
import routes from './routes'
import app from './config'

app.use('/bugbot', slack)
app.use('/', routes)

if (require.main === module) {
  app.start()
}

export default app
