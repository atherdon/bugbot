import bb from './config'
import auth from './middleware/slack-auth'

bb.get('/', (req, res)=> {
  res.redirect('/bugbot')
})

// shows the description page
bb.get('/bugbot', (req, res)=> {
  res.render('index')
})

// recives a slash command
bb.post('/bugbot', (req, res)=> {
  res.status(200).json({text:'hey it worked'})
})

bb.get('/bugbot/auth', auth)

if (require.main === module) {
  bb.start()
}

export default bb

