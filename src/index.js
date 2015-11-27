import github from 'bugbot-github-issues'
import slack from './slack'
import app from './config'

// mount the slack app
app.use('/bugbot', slack)

let index = (req, res)=>res.render('index')

// github oauth callback
function auth(req, res) {
  // exchange the code for a token
  github.token(req.query.code, (err, token)=> {
    // save the token to the slack account
    let ok = !!err
    let msg = !!err? 'Failed to authorize Github' : 'Github authorized'
    msg += JSON.stringify({err, token})
    res.render('index', {ok, msg})
  })  
}
    
// register the routes
app.get('/', index)
app.get('/bugbot/github/auth', auth)

// if we're not a module start the server
// (and otherwise export as a module …for testing, etc)
if (require.main === module) {
  app.start()
}

export default app
