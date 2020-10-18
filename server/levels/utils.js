const levels = require('./levels.json')
const checkPassword = (name, password) => {
    const level =  levels.find(level => 
        (level.name === name && level.password === password));
    return level ? level.nextLevel : null;
         
}

exports.checkPassword = checkPassword;