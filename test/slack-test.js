import test from 'tape'
import slack from '../src/slack-bang-slash-hack'
//import save from '../../src/slack/adapters/dynamo/save'

test('sanity', t=> {
  //t.plan(2)
  t.ok(slack, 'there is a slack')
  //t.ok(slack.register, 'there is a slack.register')
  t.end()
})

/*
test('cannot register with a bad code', t=> {
  t.plan(1)
  slack.register('bad-code-here', (err, response)=> {
    t.equals(err, 'invalid_code', err)
    console.log(err, response)
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
})*/
