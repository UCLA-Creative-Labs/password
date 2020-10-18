const levels = require('./levels.json')
const checkPassword = (name, password) => {
    console.log(name, password)
    return levels.find(level => 
        (level.name === name && level.password === password));

         
}

exports.checkPassword = checkPassword;