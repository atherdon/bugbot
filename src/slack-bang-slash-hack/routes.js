import express from 'express'
import path from 'path'
import {stack} from './'
import register from './methods/register'

let router = express.Router()
let tmpl = path.join(__dirname, 'views', 'index.ejs')

// register an account
function auth(req, res, next) {
  if (req.query.error === 'access_denied') {
    res.status(403).render(tmpl, {
      ok: false, 
      message: 'access denied'
    })
  }
  else {
    register(req.query.code, (err, success)=> {
      if (err) {
        res.status(500).render(tmpl, {
          ok: false, 
          msg: err
        })
      }
      else {
        res.render(tmpl, {
          ok: true,
          msg: 'success'
        }) 
      }
    })
  }
}

// shows the description page
function index(req, res, next) {
  res.render(tmpl, {
    ok: true,
    message: ''
  })
}

// recives a slash command
function slash(req, res, next) {
  let cmds = stack()                                         // all the commands
  let sub  = req.body.text? req.body.text.split(' ')[0] : '' // sub command (foo from '/bb foo')
  let cmd  = `${req.body.command} ${sub}`.trim()             // full command ('/bb foo')
  let ids  = Object.keys(cmds)                               // all the command ids
  let it   = ids.filter(id=> id.indexOf(cmd) > -1)           // array of matches
  let id   = it.length === 0? ids[0] : it[0]                 // THE id or the first one
  let msg  = cmds[id]                                        // the method to call
  let done = msg=>res.status(200).json(msg)                  // the completion callback

  // lookup the account, save if it doesn't exist, and pass the info to the callback hander
  let payload = req.body
  msg(payload, done)
}

router.get('/', index)
router.post('/', slash)
router.get('/auth', auth)

export default router
