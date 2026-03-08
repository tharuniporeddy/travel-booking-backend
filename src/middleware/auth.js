const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {

  const authHeader = req.headers["authorization"]

  let token

  if (authHeader !== undefined) {
    token = authHeader.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({
      message: "Access token missing"
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {

    if (error) {
      return res.status(403).json({
        message: "Invalid token"
      })
    }

    req.userId = payload.userId
    next()
  })
}

module.exports = authenticateToken