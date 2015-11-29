import save from './save' 
import api from './_api'

function test(token, callback) {
  let url = 'https://slack.com/api/auth.test'
  api(url, token, callback)
}

// register app to a slack team
export default function register(code, callback) {
  let url = 'https://slack.com/api/oauth.access'
  api(url, code, (err, json)=> {
    if (err) {
      callback(err)
    }
    else {
      let token = json.access_token
      let owner = true

      test(token, (err, acct)=> {
        if (err) {
          callback(err)  
        }
        else {
          let user_id = acct.user_id
          let team_id = acct.team_id

          save({token, owner, user_id, team_id}, callback)
        }
      })
    }
  })
}
