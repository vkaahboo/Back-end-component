const jwt = require("jsonwebtoken");

const generateToken = (payload, isRefreshToken) =>{

    if(isRefreshToken){
        return jwt.sign(payload, process.env.SECRET_TOKEN_REFRESH, { expiresIn: "60" });
    }

    return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "15" });
    
    



}

module.exports = generateToken;