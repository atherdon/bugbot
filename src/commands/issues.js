import github from 'bugbot-github-issues'

export default function repos(payload, message) {
  let token = payload.account.github_token
  let repo = payload.account.github_repo
  github.issues(token, repo, (err, issues)=> {
    let text = '```' + JSON.stringify(err? {err} : {issues}, null, 2) + '```'
    message({text})
  })
}
