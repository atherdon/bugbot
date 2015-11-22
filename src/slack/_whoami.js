import api from './_api'

// get account info from slack
//
// usage:
//
//   whoami('token', (err, account)=> {
//     let {url, team, user, team_id, user_id} = account
//   })
//
export default function whoami(token, callback) {
  let url = 'https://slack.com/api/auth.test'
  api(url, token, callback)
}
