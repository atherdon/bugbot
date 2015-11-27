import github from 'bugbot-github-issues'
import slack from './slack'
import jwt from 'jsonwebtoken'
import app from './config'

// mount the slack app
app.use('/bugbot', slack)

let index = (req, res)=>res.render('index')

// github oauth callback
function auth(req, res) {
  // exchange the code for a token
  github.token(req.query.code, (err, gh)=> {
    // parse response
    let jwt_token    = jwt.verify(req.query.state, process.env.SECRET)
    let user_id      = jwt_token.user_id
    let team_id      = jwt_token.team_id
    let github_token = gh.access_token
    
    // find the account in the system
    slack.find({user_id, team_id}, (err, account)=> {
      // if it exists keep token
      account.user_id = user_id
      account.team_id = team_id
      account.github_token = github_token
      // save the token to the slack account
      slack.save(account, (err, account)=> {
        let ok = err === null
        let msg = ok? 'Github authorized' : 'Failed to authorize Github'
        res.render('index', {ok, msg})
      })
    })
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
