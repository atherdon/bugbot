import req from 'request'
import path from 'path'
import env from 'node-env-file'
import save from './slack-dynamo-save'
import whoami from './slack-whoami'
import api from './slack-call-api'

// registers an account
function register(code, callback) {
  let url = 'https://slack.com/api/oauth.access'
  api(url, code, (err, json)=> {
    if (err) {
      callback(err)
    }
    else {
      let token = json.access_token
      let scope = json.scope
      // use the token to get the user account info
      whoami(token, save)      
    }
  })
}

// receive a slash command payload
function slash(payload, callback) {
  let ayload = {
    token:        'fake-token',
    team_id:      'fake-team-id',
    team_domain:  'smallwins',
    channel_id:   'C2147483705',
    channel_name: 'test',
    user_id:      'U2147483697',
    user_name:    'Steve',
    command:      '/weather',
    text:         '94070',
    response_url: 'https://hooks.slack.com/commands/1234/5678'
  }
}

let describe = `
  slack
    .register(code, (err, {code, token})=>)
    .slash ???
`

export default {describe, register, slash}
