import api from './_api'

export default function token(code, callback) {
  let url = 'https://slack.com/api/oauth.access'
  api(url, code, callback)
}
