const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")

//registro user
const signup = async (req,res) => {
    try {
        const { name, lastName, email, password } = req.body;
        const newUser = {
            name,
            lastName,
            email,
            password: await bcrypt.hash(password, 10)
        }

        await userModel.create(newUser);
        res.status(200).send("El usuario se ha creado correctamente");
        
    } catch (error) {
        res.status(500).send({ status: "Failed", error: error.message })
    }
}


//login user
const login = async (req,res) =>{
    try {
        const { email, password } = req.body;
        //el findOne pa que me devuelva un solo resultado (email)
        const user = userModel.findOne({ email: email})
        if(!user){
            return res.status(404).send("Usuario o contraseña no validos")
        }

        const validatePassword = await bcrypt.compare( password, user.password)
        if(!validatePassword){
            return res.status(404).send("Usuario o contraseña no validos")
        }

        res.status(200).send({ status: "Success", data: user});

    } catch (error) {
        res.status(500).send({ status: "Failed", error: error.message })
    }
}

module.exports = {
    signup,
    login
};