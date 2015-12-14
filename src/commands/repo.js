import slack from 'slack-express'
import github from 'bugbot-github-issues'


export default function repoCmd(payload, message, next) {

  let parts     = payload.message.text? payload.message.text.split(' ') : []
  let token     = payload.account.github_token
  let repo      = parts[1]
  let isReading = parts.length > 1

  if (isReading) {
    // check for repo 
    let text = payload.account.github_repo
    if (text) {
      // if it exists return it
      message({text})
    }
    else {
      // if it does not continue to reposet
      next()
    }
  }
  else {
    github.repos(token, (err, repos)=> {
      if (err) {
        message({text:err})
      }
      else {
        let found = repos.indexOf(repo) > -1
        if (found) {
          let acct = payload.account
          acct.github_repo = repo
          slack.save(acct, err=> {
            message({text: err? err : `Saved ${repo}`})
          })
        }
        else {
          message({text:`Bzzz. Github has nothing for ${repo}.`})
        }
      }
    })
  } 
///
}
