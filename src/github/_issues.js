import request from 'request'

function issues(token, repoID, callback) {
  let uri = `https://api.github.com/repos/${repoID}/issues`
  let json = true
  let headers = {
    'User-Agent': 'brianleroux', 
    'Authorization': `token ${token}`
  }
  request.get({uri, headers, json}, (err, res)=> {
    let issues = res.body
    callback(err, issues)
  })
}

export default issues
