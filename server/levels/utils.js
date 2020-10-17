const levels = require('./levels.json')
const checkPassword = (name, password) => {
    return levels.some(level => 
        (level.name === name && level.password === password))
}

exports.checkPassword = checkPassword;