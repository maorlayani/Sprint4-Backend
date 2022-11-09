// const { dbPassword, dbUsername } = require('../private/privateKeys.service')

module.exports = {
  'dbURL': `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0.wufamuz.mongodb.net/?retryWrites=true&w=majority`,
}
