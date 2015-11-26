import test from 'tape'
import save from '../src/slack-bang-slash-hack/adapters/dynamo/save'
import find from '../src/slack-bang-slash-hack/adapters/dynamo/find'
import register from '../src/slack-bang-slash-hack/methods/register'

test('sanity', t=> {
  t.plan(3)
  t.ok(save, 'there is a save')
  t.ok(find, 'there is a find')
  t.ok(register, 'there is a register')
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
