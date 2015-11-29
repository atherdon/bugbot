# slack-express

Quickly implement a Slack slash commands as Express middleware.

### hello world

Define a handler for `/echo` slash command:

```javascript
import slack, {slash, start} from 'slack-express'

slash('/echo', (payload, message)=> {
  // payload is recieved as a POST from Slack issued
  let {ok, text, raw, account, message} = payload
  // message accepts a Slack message json to send as response 
  let text = `Echo to Slack! ${JSON.stringify(payload, null, 2)}`
  message({text})
})

start()
```

#### generated routes

```
 GET / ....... Displays a generated install page with Add to Slack button
 GET /auth ... Auth callback from Add to Slack
POST / ....... Receives slash commands and executes registered middlware handlers

```

The `slack` object is just an Express app so you can mount it on an existing app with `app.use`. You can extend a `slack` app with regular web routes for doing things like authenticating 3rd party services. 

### middleware

The `slack.slash` function can accept any number of middlewares. Symmetry with Express aside, middleware sub stack is a nice pattern for flow control, data transform pipelines and helps guide app modularization. 

```javascript
import slack, {slash, start} from 'slack-express'

function logger(payload, message, next) {
  payload.custom = 'thing'
  console.log(payload)
  next()
}

function hello(payload, message) {
  message({
    text: 'hello world'
  })
}

slash('/hi', logger, hello)

start()

```

### persistence

You can find and store data for each Slack account interacting with your app by using `find` and `save`. 

### api

```
slack
  slash .... Register a slash command handler
  start .... Starts up the app
  button ... Add to Slack button for your app
  find ..... Find a saved Slack account
  save ..... Save a Slack account

```

## local setup

You need to create an app with Slack for a `SLACK_CLIENT_ID` and `SLACK_CLIENT_SECRET`. Then you will need to create a `.env` file with the following:

```
NODE_ENV=development
SLACK_CLIENT_ID=your-slack-client-id-here
SLACK_CLIENT_SECRET=your-slack-client-secret-here
AWS_REGION=us-east-1
SECRET=your-secret-text-here

```

Don't forget to add `.env` to your `.gitignore`.

### database

- todo dynamo setup here
- todo redis seetup here

## deploy

- todo aws here
- todo heroku here

