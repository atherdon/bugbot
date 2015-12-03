let help = `

  Welcome to Bugbot! 

    /bb ..................... shows help
    /bb whoami .............. return your account info
    /bb logout .............. revoke your github access
    /bb repo................. read your current repo
    /bb repo org/reponame ... set current repo
    /bb repos ............... list your repos
    /bb help ................ also shows help
    /bb issues .............. shows open issues

  To open a new Github Issue on the current repo:

    /bb new Your issue title here

    And issue body here. Don't forget steps to reproduce!

`

export default function help(payload, message) {
  message({text:'```'+help+'```'})
}
