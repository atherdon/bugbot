import aws from 'aws-sdk'

let dynamo = new aws.DynamoDB()

// blind write to team_id|user_id key
// {url, team, user, team_id, user_id}
function save(params, callback) {
  if (!params.team_id) {
    callback(Error('missing team_id'))
  }
  else if (!params.user_id) {
    callback(Error('missing user_id'))
  }
  else {
    let TableName = 'bugbot'
    let Item = {}
    let query = {TableName, Item}
    Object.keys(params).forEach(k=> {
      if (typeof params[k] === 'boolean') {
        query.Item[k] = {B:params[k]}
      }
      else {
        query.Item[k] = {S:params[k]}
      }
    })
    dynamo.putItem(query, (err, result)=> {
      if (err) {
        callback(err)
      }
      else {
        callback(null, params)
      }
    })
  }
}

export default save
