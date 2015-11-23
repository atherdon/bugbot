import request from 'request'
import async from 'async'
import _ from 'lodash'

let json = true

function head(token) {
  let headers = {
    'User-Agent': 'brianleroux',
    'Authorization': `token ${token}`,
    'Accept': 'application/json'
  }
  return headers
}

function getOrgs(token, callback) {
  let uri = 'https://api.github.com/user/orgs'
  let headers = head(token)
  request.get({uri, headers, json}, (err, res)=> {
    let orgs = res.body
    if (orgs.message === 'Bad credentials') {
      callback(orgs.message)
    }
    else {
      callback(err, orgs.map(o=>o.repos_url))
    } 
  })
}

function getRepos(token, uri, callback) {
  let headers = head(token)
  request.get({uri, headers, json}, (err, res)=> {
    if (err) {
      callback(err)
    }
    else {
      callback(null, res.body.map(r=>r.full_name))
    }
  })
}

function getAccount(token, callback) {
  let uri = 'https://api.github.com/user'
  let headers = head(token)
  request.get({uri, headers, json}, (err, res)=> {
    if (err) {
      callback(err)
    }
    else {
      callback(null, res.body.repos_url)
    }
  })
}

function repos(token, callback) {
  let r = cb=>getAccount(token, cb)
  let o = cb=>getOrgs(token, cb)
  let i = (repo, cb)=> getRepos(token, repo, cb)
  async.parallel([r, o], (err, repos)=> {
    async.map(_.flatten(repos), i, (err, unflat)=> {
      if (err) {
        callback(err)
      }
      else {
        callback(null, _.flatten(unflat))
      }
    })  
  })
}

export default repos
