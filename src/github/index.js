import register from './_register'
import token from './_token'
import repos from './_repos'
import issues from './_issues'

let describe = `
  github
    describe
    register((err, link)=>)
    token(code, (err, token)=>)
    repos(token, (err, repos[])=>)
    issues(token, repoID, (err, issues[])=>)
`

export default {
  describe, 
  token,
  register,
  repos, 
  issues
}
