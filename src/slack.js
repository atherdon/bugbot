import slack, {slash, start} from './slack-bang-slash-hack'

// grab le commands
import auth from './commands/auth'
import help from './commands/help'
import whoami from './commands/whoami'
import logout from './commands/logout'

// register slash command middlewares
slash('/bb',        auth, help)
slash('/bb whoami', auth, whoami)
slash('/bb logout', auth, logout)

// if being called directly startup
if (require.main === module) {
  start('bb')
}

// otherwise export for: mounting on other express apps, testing, etc
export default slack
