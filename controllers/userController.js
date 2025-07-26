const userModel = require('../models/userModel');

const getAllUser = async (req,res) =>{
    try {
        const users = await userModel.find()
        if(!users.length === 0){
             res.status(200).send({ status: 'No existe el usuario' }); 
        }
        res.status(200).send({ status: "Success", data: users});  
    } catch (error) {
        res.status(500).send({ status:"Failed", error: error.message })
    }
};
//obtener usuario por Id
//populate para que me muestre la info de la rutina, no solo el id

const getUserById = async (req,res) =>{
    try {
        const userId = req.params.idUser;
        const user = await userModel.findById(userId)
        if(!user){
             res.status(200).send({ status: 'No existe el usuario' }); 
        }
        res.status(200).send({ status: "Success", data: user});  
    } catch (error) {
        res.status(500).send({ status:"Failed", error: error.message });
    }
};




module.exports = {
    getAllUser,
    getUserById
};