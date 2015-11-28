import save from './save' 
import whoami from './whoami'
import api from './api'

// register app to a slack team
export default function register(code, callback) {
  let url = 'https://slack.com/api/oauth.access'
  api(url, code, (err, json)=> {
    if (err) {
      callback(err)
    }
    else {
      acct.token = json.access_token
      acct.owner = true
      save(acct, callback)
    }
  })
}
