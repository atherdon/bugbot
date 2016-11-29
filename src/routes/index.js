export default function index(req, res) {
  req.app.locals.client_id = process.env.SLACK_CLIENT_ID
  res.render(req.app.get('template'))
}
