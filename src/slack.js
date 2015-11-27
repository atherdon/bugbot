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

// if being called directly startup
if (require.main === module) {
  start('bb')
}

// export for: mounting on other express apps, testing, etc
export default slack
