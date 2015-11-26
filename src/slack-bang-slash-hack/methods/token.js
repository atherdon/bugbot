import api from './api'

export default function token(code, callback) {
  let url = 'https://slack.com/api/oauth.access'
  api(url, code, callback)
}
