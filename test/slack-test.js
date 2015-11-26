import path from 'path'
import test from 'tape'
import env from 'node-env-file'
import save from '../src/slack-bang-slash-hack/adapters/dynamo/save'
import find from '../src/slack-bang-slash-hack/adapters/dynamo/find'
import register from '../src/slack-bang-slash-hack/methods/register'
import whoami from '../src/slack-bang-slash-hack/methods/whoami'

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
  t.plan(4)
  t.ok(save, 'there is a save')
  t.ok(find, 'there is a find')
  t.ok(register, 'there is a register')
  t.ok(whoami, 'there is a whoami')
  t.end()
})

test('cannot register with a bad code', t=> {
  t.plan(1)
  register('bad-code-here', (err, response)=> {
    t.equals(err, 'invalid_code', err)
    console.log(err, response)
    t.end()
  })
})

test('can find a registration', t=> {
  t.plan(1)
  find({user_id:'fake_user_id', team_id:'fake_team_id'}, (err, account)=> {
    t.ok(account, account)
    console.log(account)
    t.end()
  })
})

test('can save a registration', t=> {
  t.plan(1)
  let user_id= 'fake_user_id'
  let team_id = 'fake_team_id'
  save({user_id, team_id}, (err, account)=> {
    if (err) {
      t.fail(err, err)
    }
    else {
      t.ok(account, 'saved account')
      console.log(account)
    }
    t.end()
  })
})

test('whomai', t=> {
  let token = process.env.SLACK_TEST_TOKEN
  whoami(token, (err, account)=> {
    if (err) {
      t.fail(err, err)
      console.log('token: ', token)
    }
    else {
      t.ok(account, 'got an account for token ' + token)
      console.log(account)
    }
    t.end()
  })
})
