import test from 'tape'
import async from 'async'
import request from 'request'
import bot from '../'

let handler
let port = 3333
let base = `http://localhost:${port}`

test('sanity', t=> {
  t.ok(bot, 'there is bot')
  console.log(bot)
  t.end()
})

test('bot server starts', t=> {
  t.plan(1)
  handler = bot.listen(port, x=> {
    t.ok(true, `server started @ ${base}`)
    t.end()
  })
})


// this test looks crazier than it is
// the first object is the entire thing
test('bot routes are legit', t=> {
  let routesAndExpectedStatusCode = {
    '/bugbot':200,
    '/bugbot/auth?code=blah':500,
    '/bugbot/auth?error=access_denied':403
  }
  let routes = Object.keys(routesAndExpectedStatusCode)
  // we plan to have one test per route plus one for completion
  t.plan(routes.length + 1) 
  // generate an array of tests for each route
  let tests = routes.map(route=> {
    return function botTest(done) {
      request.get(`${base}${route}`, (err, res)=> {
        if (err) {
          t.fail(err, err)
          done(err)
        }
        else {
          t.equals(res.statusCode, routesAndExpectedStatusCode[route], 'status matched')
          console.log(res.body)
          done()
        }
      })
    }
  })
  // run the generated tests in parallel to completion 
  async.parallel(tests, (err, results)=> {
    if (err) {
      t.fail(err, err)
    }
    else {
      t.ok(results, 'routes match expected status codes')
    }
    t.end()
  })
})

test('bot can recieve a POST from Slack', t=> {
  let json = true
  let url = `${base}/bugbot`
  let form = require('./payload.json')
  let query = {url, form, json}

  request.post(query, (err, res)=> {
    if (err) {
      t.fail(err, err)
    }
    else if (res.body.error) {
      t.fail(res.body.error, res.body.error)
    }
    else {
      let json = res.body
      t.ok(json, 'got json')
      console.log(json)
    }
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
