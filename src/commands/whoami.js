export default function whoami(payload, message) {
  message({
    text: '```' + JSON.stringify({payload}, null, 2) + '```'
  })
}
