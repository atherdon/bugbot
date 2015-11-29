import github from 'bugbot-github-issues'

export default function repo(payload, message) {
  let token = payload.account.github_token
  github.repos(token, (err, repos)=> {
    let text = '```' + JSON.stringify(err? {err} : {repos}, null, 2) + '```'
    message({text})
  })
}
