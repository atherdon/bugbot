import app from './express'
import chalk from 'chalk'

let cmds = {}

export function stack() {
  return cmds
}

export function slash(command, callback) {
  console.log('listening for: ', command)
  cmds[command] = callback
}

export function start(name='slack-app') {
  let port = process.env.PORT || 3000
  app.listen(port, x=> {
    if (!process.env.NODE_ENV) {
      let msg = chalk.green(`#!/${name}>`)
      let url = chalk.underline.cyan(`http://localhost:${port}`)
      console.log(`${msg} ${url}`)
    }
  })
}

app.stack = stack
app.slash = slash
app.start = start

export default app
