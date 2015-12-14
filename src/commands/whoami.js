export default function whoami(payload, message) {
  let text = `You're currently logged into Bugbot with Github user gracehopper`
  let color = '#E3E4E6'
  let mrkdwn_in = ['text']
  message({attachments:[{text, color, mrkdwn_in}]})
}
