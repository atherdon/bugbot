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
  let cmds = stack()
  let sub = req.body.text? req.body.split(' ')[0] : ''
  let cmd = `${req.body.command} ${sub}`.trim()
  let ids = Object.keys(cmds)
  let it = ids.filter(id=> id.indexOf(cmd) > -1)

  if (it.length === 0) {
    it = ids[0]
  }
  else {
    it = it[0]
  }

  function done(msg) {
    res.status(200).json(msg) 
  }

  cmds[it](req.body, done)

  //res.status(200).json({b:req.body, l:ids.length} )
}

router.get('/', index)
router.post('/', slash)
router.get('/auth', auth)

export default router
