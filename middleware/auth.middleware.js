const { JsonWebTokenError } = require("jsonwebtoken");

function validateToken(req, res, next) {
  if (req.headers["token"]) {
    jwt.verify(req.headers["token"],SECRET_KEY);
  } else {
    next();
  }
}
module.exports = {
  validateToken,
};
