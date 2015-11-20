import slack from '../models/slack'

export default function auth(req, res, next) {
  if (req.query.error === 'access_denied') {
    res.status(403).render('fail', {msg:'access denied'})
  }
  else {
    slack.register(req.query.code, (err, success)=> {
      if (err) {
        res.status(500).render('fail', {msg:'failed registration'})
      }
      else {
        res.render('success') 
      }
    })
  }
}
