import _install from '../methods/_install'

// register the integration account (effectively the app owner)
export default function install(req, res, next) {
  if (req.query.error === 'access_denied') {
    res.status(403).render('install', {
      ok: false, 
      msg: 'access denied'
    })
  }
  else {
    _install(req.query.code, (err, success)=> {
      if (err) {
        res.status(500).render('install', {
          ok: false, 
          msg: err
        })
      }
      else {
        res.render('install', {
          ok: true,
          msg: 'Successfulling installed'
        }) 
      }
    })
  }
}
