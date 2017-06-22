# :honeybee: Bugbot
## 🚨 Bugbot is no longer actively maintained. Pull requests are still accepted! 🚨

[ ![Codeship Status for smallwins/bugbot](https://codeship.com/projects/31f8ea00-7524-0133-c948-4a1a1f122b0d/status?branch=master)](https://codeship.com/projects/117844) [![bitHound Code](https://www.bithound.io/github/smallwins/bugbot/badges/code.svg)](https://www.bithound.io/github/smallwins/bugbot) [![bitHound Dependencies](https://www.bithound.io/github/smallwins/bugbot/badges/dependencies.svg)](https://www.bithound.io/github/smallwins/bugbot/master/dependencies/npm)


## Dev setup

1. Clone this repo and run `npm i`.
2. Create a `.env` file with:
  - `APP_NAME=bugbot`
  - `GITHUB_CLIENT_ID`
  - `GITHUB_CLIENT_SECRET`
  - `SLACK_CLIENT_ID`
  - `SLACK_CLIENT_SECRET`
  - `AWS_REGION` (if you are using the dynamo adapter)

### Run the tests

    npm test

### Start the server

    npm start

## Deploy

- Slack requires SSL. http://serverfault.com/questions/393822/how-do-i-install-intermediate-certificates-in-aws
- TODO Heroku deploy
- TODO Beanstalk deploy
- TODO Digital Ocean deploy
