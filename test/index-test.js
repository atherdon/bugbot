import express from 'express'
import parser from 'body-parser'
import test from 'tape'
import async from 'async'
import request from 'request'
import bot from '../'
import env from 'node-env-file'
import path from 'path'

let mode = process.env.NODE_ENV
let isDev = typeof mode === 'undefined' || mode === 'development'
if (isDev) env(path.join(process.cwd(), '.env'))

let handler
let port = 3333
let base = `http://localhost:${port}`

test('sanity', t=> {
  t.ok(bot, 'there is bot')
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
    '/':200,
    '/auth?code=blah':500,
    '/auth?error=access_denied':403
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

let fakehandle, fake = express()
test('can fake a server for recieving incoming webhooks', t=> {
  fake.use(parser.urlencoded({extended:true}))
  fake.use(parser.json())
  fake.post('/', (req, res)=> {
    console.log('got a post on 6666! ', req.body)
    res.status(200).end()
  })
  fakehandle = fake.listen(6666)
  t.ok(handler, 'got a server')
  t.end()
})

test('bot can recieve a POST from Slack', t=> {
  let json = true
  let url = `${base}`
  let form = require('./payload.json')
  let query = {url, form, json}

  request.post(query, (err, res)=> {
    if (err) {
      t.fail(err, err)
    }
    else if (res.statusCode === 200) {
      t.ok(res, 'response was gud')
      console.log(res.statusCode)
    }
    else {
      t.fail(res, 'status was not 200')
      console.log(res.statusCode)
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

test('fake slack server close', t=> {
  t.plan(1)
  fakehandle.close(x=> {
    t.ok('wtf', 'server closed')
    t.end()
  })
})
