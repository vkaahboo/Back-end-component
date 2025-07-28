const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) => {
    try {
        const token = req.header("auth-token");
        if(!token) return res.status(401).send("Acesso Denegado");

        const payload = jwt.verify(token, process.env.SECRET_TOKEN);
        console.log(payload)
        req.payload = payload;
        next();
    } catch (error) {
        res.status(401).send({ status: "Token Expirado", error: error.message })
    }
    
}

module.exports = verifyToken;