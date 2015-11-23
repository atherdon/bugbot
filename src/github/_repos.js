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
    callback(null, res.body.map(r=>r.full_name))
  })
}


export default function repos(token, callback) {
  // first grab user account repos
  let uri = 'https://api.github.com/user'
  let headers = head(token)
  request.get({uri, headers, json}, (err, res)=> {
    if (err) {
      callback(err)
    }
    else {
      // add those repos to the list of repos
      let uri = res.body.repos_url
      let reposToFetch = []
      reposToFetch.push(uri)

      // now grab all the ors
      // FIXME this could be parallel
      getOrgs(token, (err, orgs)=> {
        if (err) {
          callback(err)
        }
        else {

          // now grab all the repos for the orgs and user account
          let repos = reposToFetch.concat(orgs)
          let iter = (repo, cb)=> getRepos(token, repo, cb)
          async.map(repos, iter, (err, unflat)=> {
            if (err) {
              callback(err)
            }
            else {
              callback(null, _.flatten(unflat))
            }
          })
        }
      })
    }
  })
}
