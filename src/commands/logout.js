import slack from 'slack-express'
import github from 'bugbot-github-issues'

export default function logout(payload, message) {
  let account = payload.account
  delete account.github_token

  github.user(payload.account.github_token, (err, user)=> {
    if (err) {
      message({text:err})
    }
    else {
      let usr = '`'+ user.login +'`'
      let text = `Oh! It's cool, I understand. I've logged out ${usr}. Hope to see you soon!`
      let color = '#E3E4E6'
      let mrkdwn_in = ['text']
      let author_name = user.login
      let author_link = user.html_url 
      let author_icon = user.avatar_url

      slack.save(account, err=> {
        message({attachments:[
          {text, color, mrkdwn_in, author_name, author_link, author_icon}
        ]})
      })
    }
  })
}
