const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token")
  if (!token) return res.status(401).send("Acceso denegado")
  
  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN)
    req.payload = payload
    next()
  } catch (error) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_TOKEN_REFRESH)
      req.payload = payload
      next()
    } catch (error) {
      res.status(401).send({ status: "Token expired", error: error.message })
    }
  }
};

module.exports = verifyToken;