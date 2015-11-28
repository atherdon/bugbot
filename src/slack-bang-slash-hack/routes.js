import express from 'express'
import path from 'path'
import {stack} from './'
import register from './methods/register'
import find from './methods/find'

let router = express.Router()
let tmpl = 'install'
let install = (req, res)=>res.render(tmpl)

// register the integration account (effectively the app owner)
function auth(req, res, next) {
  if (req.query.error === 'access_denied') {
    res.status(403).render(tmpl, {
      ok: false, 
      msg: 'access denied'
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

  // cleanup the payload signature {raw, message, account}
  let payload = {
    ok: true,
    raw: req.body,
    account: {},
    message: {
      token: req.body.token, 
      response_url: req.body.response_url, 
      channel_id: req.body.channel_id,
      channel_name: req.body.channel_name,
      command: req.body.command,
      text: req.body.text
    }
  }

  // lookup the account in the db
  find(payload.raw, (err, account)=> {
    if (err) {
      payload.ok = false
      payload.text = 'find method returned an error'
    }
    else if (!account) {
      payload.ok = true 
      payload.text = 'account not found'
    }
    else {
      payload.ok = true 
      payload.text = 'account found'
      payload.account = account
    }
    msg(payload, done)
  })
}

router.get('/', install)
router.post('/', slash)
router.get('/auth', auth)

export default router
