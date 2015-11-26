import github from 'bugbot-github-issues'
import slack, {slash, start} from './slack-bang-slash-hack'

let help = `

Welcome to Bugbot! 

  /bb ..................... shows help
  /bb auth ................ return your account info
  /bb repo................. read your current repo
  /bb repo org/reponame ... set current repo
  /bb repo list ........... list your repos
  /bb help ................ also shows help
  /bb open ................ shows open issues

To open a new Github Issue on the current repo:

  /bb open your issue title here

  And issue body here. Don't forget steps to reproduce!

`

// handler for the slack slash command: /bugbot
slash('/bb', (payload, message)=> {
  if (payload.account.github_token) {
    let text = `${help} ${JSON.stringify(payload)}`
    message({text})
  }
  else {
    github.register((err, link)=> {
      let text = `${err? err : link} ${JSON.stringify(payload)}`
      message({text})
    })
  }
})

// handler for the slack slash command: /bugbot
slash('/bb open', (payload, message)=> {
  message({
    text: `/bb open got a message! ${JSON.stringify(payload)}`
  })
})

// handler for the slack slash command: /bugbot
slash('/bb list', (payload, message)=> {
  message({
    text: `/bb list got a message! ${JSON.stringify(payload)}`
  })
})

// handler for the slack slash command: /bugbot
slash('/bb help', (payload, message)=> {
  message({
    text: `/bb help got a message! ${JSON.stringify(payload)}`
  })
})

// start('bb')

// create a fresh express app
import app from './express'

// mount the slack app
app.use('/bugbot', slack)
    
// render the homepage
app.get('/', (req, res)=> {
  res.render('index', {
    ok: true,
    msg: ''
  })
})

import token from './slack-bang-slash-hack/methods/token'
import whoami from './slack-bang-slash-hack/methods/whoami'

app.get('/bugbot/slack/auth', (req, res)=> {
  if (req.query.error === 'access_denied') {
    req.session.destroy()
    res.render('index', {
      ok: false,
      msg: 'access denied'
    })
  }
  else {
    // use the token to get the profile
    token(req.query.code, (err, token)=> {
      if (err) {
        res.status(500).render('index', {
          ok: false,
          msg: 'failed to exchange code for token ' + err
        })
      }
      else {
        whoami(token, (err, account)=> {
          req.session.account = account
          res.render('index', {
            ok: true,
            msg: 'Authenticated with Slack'
          })
        })
      }

      // save the profile/token

      // show the prompt for github auth
    })
  } 
})

// github auth callback
app.get('/bugbot/github/auth', (req, res)=> {
  // exchange the code for a token
  github.token(req.query.code, (err, token)=> {
    // save the token to the slack account
    res.render('index', {
      ok: !!err,
      msg: err? 'Failed to authorize Github' : 'Github authorized'
    })
  })  
})

// if we're not a module start the server
// (and otherwise export as a module …for testing, etc)
if (require.main === module) {
  app.listen(process.env.PORT || 3000, x=> {
    console.log('listening on http://localhost:3000')
  })
}

export default app
