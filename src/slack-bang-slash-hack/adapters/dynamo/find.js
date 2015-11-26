import aws from 'aws-sdk'

let dynamo = new aws.DynamoDB()

function clean(obj) {
  let keys = Object.keys(obj)
  let result = {}
  keys.forEach(k=> {
    result[k] = obj[k].S || obj[k].BOOL
  })
  return result
}

function find(params, callback) {
  if (!params.user_id || !params.team_id) {
    callback(Error('user_id or team_id missing'))
  }
  else {
    // query for the account in dynamo
    let query = {
      TableName: 'bugbot',
      Key: {
        user_id:{S:params.user_id}, 
        team_id:{S:params.team_id}
      }
    }
    dynamo.getItem(query, (err, data)=> {
      if (err) {
        callback(err)
      }
      else {
        let account = data.Item? clean(data.Item) : null
        callback(null, account)
      }
    })
  }
}

export default find
