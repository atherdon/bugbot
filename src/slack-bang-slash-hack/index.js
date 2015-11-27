import app from './config'
import button from './methods/button'
import find from './methods/find'
import save from './methods/save'
import whoami from './methods/whoami'
import chalk from 'chalk'

let port = process.env.PORT || 3000
let cmds = {}

export function stack() {
  return cmds
}

export function slash(cmd, callback) {
  cmds[cmd] = callback
}

export function start(name='slack-app') {
  app.listen(port, x=> {
    if (process.env.NODE_ENV === 'development') {
      let msg = chalk.green(`#!/${name}>`)
      let url = chalk.underline.cyan(`http://localhost:${port}`)
      console.log(`${msg} ${url}`)
    }
  })
}

app.stack  = stack
app.slash  = slash
app.start  = start
app.button = button
app.find   = find
app.save   = save
app.whoami = whoami

export default app
