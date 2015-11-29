export default function repoCmd(payload, message) {

  let repo = payload.account.github_repo
  let text = repo? repo : `
        
  No repo set! Select a repo by running:
       
    /bb repo username/reponame

  You can list all your repos by running:

    /bb repos

  `
  message({text})
}
