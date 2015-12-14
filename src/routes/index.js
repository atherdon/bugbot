export default function index(req, res) {
  res.render(req.app.get('template'))
}
