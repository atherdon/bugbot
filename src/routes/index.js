export default function index(req, res) {
  req.app.locals.client_id = process.env.SLACK_CLIENT_ID
      console.log('GOT A ROUTE', req.app.locals.client_id)
  res.render(req.app.get('template'))
}
