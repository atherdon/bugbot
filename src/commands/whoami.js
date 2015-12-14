import github from 'bugbot-github-issues'

export default function whoami(payload, message) {
  github.user(payload.account.github_token, (err, user)=> {
    if (err) {
      message({text:err})
    }
    else {
      let text = `You're currently logged into Bugbot with Github user /`${user.login}/``
      let color = '#E3E4E6'
      let mrkdwn_in = ['text']
      let author_name = user.login
      let author_link = user.html_url 
      let author_icon = user.avatar_url

      message({attachments:[
        {text, color, mrkdwn_in, author_name, author_link, author_icon}
      ]})
    }
  })
}
