const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)

    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    delete user.password
    user._id = user._id.toString()
    return user
}

async function signup({ username, password, fullname }) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
    if (!username || !password || !fullname) return Promise.reject('Missing required signup information')
    const userExist = await userService.getByUsername(username)
    if (userExist) return Promise.reject('Username already taken')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, password: hash, fullname })
}


function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify(user))
}

function validateToken(loginToken) {
    try {
        let loggedinUser
        if (!loginToken) {
            loggedinUser = {
                "_id": "u199",
                "fullname": "Guest",
                "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1670317536/170_t4mend.png"
            }
        } else {
            const json = cryptr.decrypt(loginToken)
            loggedinUser = JSON.parse(json)
        }
        return loggedinUser

    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}


module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
}