import github from 'bugbot-github-issues'
import jwt from 'jsonwebtoken'
import uuid from 'node-uuid'
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

// this means tokens are invalid between redeploys
// so far, using token only to encode state on github auth callback
let secret = uuid.v4()

// handler for the slack slash command: /bugbot
slash('/bb', (payload, message)=> {
  if (payload.account.github_token) {
    let text = `${help} ${JSON.stringify(payload)}`
    message({text})
  }
  else {
    // grab a reg link
    github.register((err, link)=> {
      // encode the slack team_id and user_id so we know who to associate this to
      let state = {user_id: payload.account.user_id, team_id: payload.account.team_id}
      var token = jwt.sign(state, secret) 
      let anchor = `${link}&state=${token}`
      let text = `${err? err : anchor} \n\n\n ${JSON.stringify(payload)}`
      message({text})
    })
  }
})


// if being called directly startup
if (require.main === module) {
  start('bb')
}

// export for: mounting on other express apps, testing, etc
export default slack
