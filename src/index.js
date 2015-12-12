import env from 'node-env-file'
import path from 'path'
import slack, {slash, start} from 'slack-express'
import github from './routes/auth'
import index from './routes/index'

// grab le commands
import auth from './commands/auth'
import help from './commands/help'
import whoami from './commands/whoami'
import logout from './commands/logout'
import repo from './commands/repo'
import repos from './commands/repos'
import issues from './commands/issues'

// register slash command middlewares
slash('/bugbot',        auth, help)
slash('/bugbot whoami', auth, whoami)
slash('/bugbot logout', auth, logout)
slash('/bugbot repo',   auth, repo)
slash('/bugbot repos',  auth, repos)
slash('/bugbot issues', auth, issues)

// setup some http routes
slack.get('/', index)
slack.get('/github/auth', github)
slack.set('template', path.join(__dirname, 'views/bugbot.ejs'))

// if being called directly startup
if (require.main === module) {
  let mode = process.env.NODE_ENV
  let isDev = typeof mode === 'undefined' || mode === 'development'
  if (isDev) env(path.join(process.cwd(), '.env'))
  start('bb')
}

// otherwise export for: mounting on other express apps, testing, etc
export default slack
