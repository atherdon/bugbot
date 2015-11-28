import slack from '../slack-bang-slash-hack'

export default function logout(payload, message) {
  let account = payload.account
  delete account.github_token
  slack.save(account, err=> {
    message({
      text: err? 'Failed to logout from Github' : 'Successfully logged out of Github'
    })
  })
}
