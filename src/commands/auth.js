import github from 'bugbot-github-issues'
import jwt from 'jsonwebtoken'

export default function auth(payload, message, next) {
  if (payload.account.github_token) {
    next(payload, message)
  }
  else {
    // grab a reg link
    github.register((err, link)=> {
      // encode the slack team_id and user_id so we know who to associate this to
      let state  = {user_id: payload.account.user_id, team_id: payload.account.team_id}
      let secret = process.env.SECRET
      var token  = jwt.sign(state, secret) 
      let anchor = `<${link}&state=${token}|Please login with Github to use Bugbot>`
      let text   = `${err? err : anchor} \n\n\n ${JSON.stringify(payload)}`
      message({text})
    })
  }
}
