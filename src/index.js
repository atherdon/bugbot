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
import repoIsSet from './commands/repo-is-set'
import issues from './commands/issues'
import add from './commands/add'

// register slash command middlewares
slash('/bugbot help',   help)
slash('/bugbot',        auth, help)
slash('/bugbot add',    auth, repoIsSet, add)
slash('/bugbot issues', auth, repoIsSet, issues)
slash('/bugbot repo',   auth, repo, repoIsSet)
slash('/bugbot repos',  auth, repos)
slash('/bugbot whoami', auth, whoami)
slash('/bugbot logout', auth, logout)

// setup some http routes
slack.set('template', path.join(__dirname, 'views/bugbot.ejs'))
slack.get('/', index)
slack.get('/github/auth', github)

// if being called directly startup
if (require.main === module) {
  start('bb')
}

// otherwise export for: mounting on other express apps, testing, etc
export default slack
