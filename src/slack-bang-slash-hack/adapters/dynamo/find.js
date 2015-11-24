function find(params, callback) {
  if (!params.user_id || !params.team_id) {
    callback(Error('user_id or team_id missing'))
  }
  else {
    // query for the account in dynamo
  }
}

export default find
