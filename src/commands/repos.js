import github from 'bugbot-github-issues'

export default function repos(payload, message) {
  let token = payload.account.github_token
  let text = "Here's a list of the Github repos I can use:\n" 
  let color = '#E3E4E6'
  let mrkdwn_in = ['text']
  // get the repos
  github.repos(token, (err, repos)=> {
    // add the repos
    repos.forEach(r=> {
      text += `- ${r}\n`
    })
    text += 'To change to another repo just run this command:\n'
    text += '`/bugbot repo org/reponame`'
    // send the reponse msg
    message({attachments:[
      {text, color, mrkdwn_in}
    ]})
  })
}
