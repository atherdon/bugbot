export default function tayne(payload, message) {
  let knowledge = [
    'https://s3-us-west-1.amazonaws.com/bugbot/celeryman.gif',
    'https://s3-us-west-1.amazonaws.com/bugbot/flarhgunnstow.gif',
    'https://s3-us-west-1.amazonaws.com/bugbot/hatwobble.gif',
    'https://s3-us-west-1.amazonaws.com/bugbot/oyster.gif'
  ]
  let index = Math.floor(Math.random() * (knowledge.length - 1) + 1)
  message({
    mrkdwn: true,
    response_type:'in_channel',
    text: '<https://www.youtube.com/watch?v=MHWBEK8w_YY|The bestest.> :sparkles:',
    attachments:[{
      'image_url':knowledge[index]
    }]
  })
}
