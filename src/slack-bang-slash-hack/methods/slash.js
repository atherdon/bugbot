
// receive a slash command payload
export default function slash(payload, callback) {
  let commands = {list, open, help}
  let key = payload.command.replace('/', '')
  let cmds = Object.keys(commands)
  let validCommand = cmds.indexOf(key) > -1
  if (validCommand) {
    commands[key].call({}, payload, callback)
  }
  else {
    callback(Error('Command invalid.'))
  }
}
