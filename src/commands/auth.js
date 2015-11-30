import github from 'bugbot-github-issues'
import jwt from 'jsonwebtoken'

export default function auth(payload, message, next) {
  if (payload.account.github_token) {
    next()
  }
  else {
    // grab a reg link
    github.register((err, link)=> {
      // encode the slack team_id and user_id so we know who to associate this to
      let secret = process.env.SECRET
      let state  = {user_id:payload.account.user_id, team_id:payload.account.team_id}
      let token  = jwt.sign(state, secret) 

      let text   = err? err: `

        Hey there! It looks like you haven’t authorized a Github account  yet. We need to do that in order to work with your Github Issues. Please <${link}&state=${token}|please authorize here>, and I’ll be ready for you when you’re back!
        
        `
      message({text})
    })
  }
}
