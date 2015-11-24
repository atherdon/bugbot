import save from './adapters/dynamo/save'
import whoami from './_whoami'
import api from './_api'

// registers an account
export default function register(code, callback) {
  let url = 'https://slack.com/api/oauth.access'
  api(url, code, (err, json)=> {
    if (err) {
      callback(err)
    }
    else {
      let token = json.access_token
      let scope = json.scope
      // use the token to get the user account info
      // TODO configurable adapter (need to add a redis adapter for heroku deploys)
      whoami(token, save)      
    }
  })
}
