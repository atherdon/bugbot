import env from 'node-env-file'
import path from 'path'
import test from 'tape'
import github from '../src/github'

// if we're in dev grab env vars from .env
let mode = process.env.NODE_ENV
let isDev = typeof mode === 'undefined' || mode === 'development'
if (isDev) {
  env(path.join(process.cwd(), '.env'))
  console.log('ENV loading isDev')
}
else {
  console.log('ENV loading ! isDev')
}

test('sanity', t=> {
  t.plan(1)
  t.ok(github, 'there is a gh')
  console.log(github.describe)
  t.end()
})

test('can register', t=> {
  t.plan(1)
  github.register((err, link)=> {
    if (err) {
      t.fail(err, err)
    }
    else {
      t.ok(link, 'got a link to register')
      console.log(link)
    }
    t.end()
  })
})

test('get access token with code', t=> {
  if (process.env.TOKEN) {
    t.plan(1)
    t.ok(process.env.TOKEN, 'got a token')
    console.log(process.env.TOKEN)
    t.end()
  }
  else {
    let code = 'enter a code here but do not commit it'
    t.plan(1)
    github.token(code, (err, token)=> {
      if (err) {
        t.fail(err, err)
        console.error(err)
      }
      else {
        t.ok(token, 'got a token')
        console.log(token)
      }
      t.end()
    })
  }
})

test('can get repos', t=> {
  t.plan(1)
  github.repos(process.env.TOKEN, (err, repos)=> {
    if (err) {
      t.fail(err, err)
    }
    else {
      t.ok(repos, 'got repos')
      console.log(repos)
    }
    t.end()
  })
})

test('can get issues for repo', t=> {
  t.plan(1)
  github.issues(process.env.TOKEN, 'checkplease/main', (err, issues)=> {
    if (err) {
      t.fail(err, err)
    }
    else {
      t.ok(issues, 'got issues')
      console.log(issues)
    }
    t.end()
  })
})

