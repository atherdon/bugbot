import req from 'request'

export default function token(code, callback) {

  let url = 'https://github.com/login/oauth/access_token'
  let client_id = process.env.GITHUB_CLIENT_ID
  let client_secret = process.env.GITHUB_CLIENT_SECRET
  let json = true
  let headers = {'Accept': 'application/json'}
  let form = {client_id, client_secret, code}
  let query = {url, headers, form, json}

  req.post(query, (err, res)=> {
    if (err) {
      callback(err)
    }
    else if (res.body.error) {
      callback(Error(res.body.error))
    }
    else {
      callback(null, res.body)
    }
  })
}
