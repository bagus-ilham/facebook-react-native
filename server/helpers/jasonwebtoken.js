const jwt = require("jsonwebtoken");

const verifyToken = (payload) => {
    return jwt.verify(payload, process.env.SECRET)
}

const signToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET)
}

module.exports = { verifyToken, signToken }