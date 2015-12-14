
let text = 'Okay, I created a new issue!'

let attachments = [{ 
  title: 'fake title', 
  title_url: 'https://github.com/smallwins/bugbot',
  color: '#2FA44F',
  text: "Please don't forget to add your label, milestone, and assignee by editing the issue on Github.",
  mrkdwn_in: ['text']
}]

export default function add(payload, message) {
  message({text, attachments})
}
