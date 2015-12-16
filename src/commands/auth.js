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


        console.log('GETTING the payload for Amber maybe', payload)

      let state  = {user_id:payload.account.user_id, team_id:payload.account.team_id}
      let token  = jwt.sign(state, secret) 

      let color = '#E3E4E6'
      let mrkdwn_in = ['text']
      let title = 'Uh oh, I need you to auth your Github account!'
      let title_link = `${link}&state=${token}`

      let text = 'Hey there, It looks like you haven’t authorized a Github account yet! '
      text += 'I need to do that in order to work with your Github Issues. '
      text += `<${link}&state=${token}|Please authorize here>, and I'll be ready for you when you’re back!`

      let attachments = [{title, color, text, mrkdwn_in}]

      message(err? {text:err} : {attachments})
    })
  }
}
