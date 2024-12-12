const jwt = require("jsonwebtoken");

const SECRET_KEY = "USER_AUTH";

function generateToken(data={},) {
  const token = jwt.sign(data, SECRET_KEY, {
    expiresIn: '1hr',
  });
    return token;
}
module.exports = {
    generateToken
}