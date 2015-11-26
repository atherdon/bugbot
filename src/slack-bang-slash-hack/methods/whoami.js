import api from './api'
import async from 'async'
import req from 'request'

// get account info from slack
//
// usage:
//
//   whoami('token', (err, account)=> {
//     let {url, team, user, team_id, user_id} = account
//   })
//
export default function whoami(token, callback) {

  function test(callback) {
    let url = 'https://slack.com/api/auth.test'
    api(url, token, callback)
  }

  function info(user, callback) {
    let url = 'https://slack.com/api/users.info'
    let form = {token, user}
    let headers = {Accept: 'application/json'}
    let json = true
    let query = {url, headers, form, json}
    req.post(query, (err, res)=> {
      if (err) {
        callback(err)
      }
      else if (res.body.error) {
        callback(res.body.error)
       }
      else {
        let json = res.body
        delete json.ok
        callback(null, json)
      }
    })
  }

  test((err, json)=> {
    if (err) {
      callback(err)
    }
    else {
      info(json.user_id, (err, infos)=> {
        let fresh = {
          team_id: json.team_id,
          user_id: json.user_id,
          user:    json.user,
          email:   infos.user.profile.email,
          avatar:  infos.user.profile.image_48,
          url:     json.url,
          team:    json.team
        }
        callback(null, fresh)
      })
    }
  })
///
}
