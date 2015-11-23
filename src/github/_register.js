
export default function register(callback) {
  let app = process.env.GITHUB_CLIENT_ID
  if (typeof app === 'undefined') {
    callback(Error('missing process.env.GITHUB_CLIENT_ID'))
  }
  else {
    let url = 'https://github.com/login/oauth/authorize'
    let query = `?client_id=${app}&scope=user,repo`
    callback(null, `${url}${query}`)
  }
}
