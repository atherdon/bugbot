export default function tayne(payload, message) {
  let knowledge = [
    'https://s3-us-west-1.amazonaws.com/bugbot/celeryman.gif',
    'https://s3-us-west-1.amazonaws.com/bugbot/flarhgunnstow.gif',
    'https://s3-us-west-1.amazonaws.com/bugbot/hatwobble.gif',
    'https://s3-us-west-1.amazonaws.com/bugbot/oyster.gif'
  ]
  let index = Math.floor(Math.random() * (knowledge.length - 1) + 1)
  message({
    response_type:'in_channel',
    attachments:[{
      title:'The bestest :sparkles:',
      title_link:'https://www.youtube.com/watch?v=MHWBEK8w_YY',
      color:'#36a64f',
      mrkdwn_in:['title'],
      image_url:knowledge[index]
    }]
  })
}
