const bcrypt = require('bcrypt');

const compared = (password, comparePassword) => {
    return bcrypt.compareSync(password, comparePassword);
}

const hashing = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

module.exports = { compared, hashing }