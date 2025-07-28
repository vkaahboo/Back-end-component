const express = require("express");
const router = express.Router();
const {
    signup,
    login,
    getTokens
} = require("../controllers/loginController")
const verifyToken = require("../middlewares/auth")

//Rutas
router.post("/signup", signup);
router.post("/login", login);
router.get("/refresh_token", verifyToken, getTokens);

module.exports = router;