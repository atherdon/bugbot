import test from 'tape'
import bot from '../'

let handler;

test('sanity', t=> {
  t.ok(bot, 'there is bot')
  console.log(bot)
  t.end()
})

test('bot server starts', t=> {
  t.plan(1)
  handler = bot.listen(3333, x=> {
    t.ok('wtf', 'server started')
    t.end()
  })
})

test('bot server close', t=> {
  t.plan(1)
  handler.close(x=> {
    t.ok('wtf', 'server closed')
    t.end()
  })
})
