import github from 'bugbot-github-issues'
import slack, {slash, start} from './slack-bang-slash-hack'

// handler for the slack slash command: /bugbot
slash('/bb', (payload, message)=> {
  if (payload.account.github_token) {
    let text = JSON.stringify(payload)
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

//start('bb')

import express from 'express'
import path from 'path'

// create a brand new express app
let app = express()

// setup some local views
let views = path.join(__dirname, 'views')
app.set('views', views)
app.set('view engine', 'ejs')

// mount our slash command app
app.use('/bugbot', slack)
    
// render the homepage
app.get('/', (req, res)=> {
  res.render('index')
})

// if we're not a module start the server
// (and otherwise export as a module …for testing, etc)
if (require.main === module) {
  app.listen(process.env.PORT || 3000, x=> {
    console.log('listening on http://localhost:3000')
  })
}

export default app
