const userModel = require('../models/userModel');
const habitModel = require("../models/habitsModel");

//obtener todos los usuarios
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
        const userId = req.payload._id;
        const user = await userModel.findById(userId).populate({ path: "favouriteHabit", select: "habitName description"});
        if(!user){
             res.status(200).send({ status: 'No existe el usuario' }); 
        }
        res.status(200).send({ status: "Success", data: user});  
    } catch (error) {
        res.status(500).send({ status:"Failed", error: error.message });
    }
};


//eliminar usuario
const deleteUSer = async (req,res) =>{
    try {
        const userId = req.params.idUser;
        const user = await userModel.findByIdAndDelete(userId)
        if(!user){
             res.status(200).send({ status: 'No existe el usuario' }); 
        }
        res.status(200).send({ status: "Success", data: "Se ha eliminado correctamente el usuario"});
    } catch (error) {
        res.status(500).send({ status:"Failed", error: error.message });
    }
}

//Actualizar usuario
const updateUser = async (req,res) =>{
    try {
        const userId = req.params.idUser;
        const newUser = req.body;
        const update = await userModel.findByIdAndUpdate(
            userId,
            newUser,
            {
                new: true,
                runValidators: true
            }
        );

        if(!update){
            return res.status(200).send({ status: 'No existe el usuario' });
        }
        res.status(200).send({ status: "Success", data: "Se ha actualizado correctamente el usuario"});
    } catch (error) {
        res.status(500).send({ status:"Failed", error: error.message });
    }
}

//añadir habito a user
const addFavouriteRoutine = async (req, res) => {
    try {
        const { idUser, idHabit } = req.params;
        const user = await userModel.findById(idUser);
        if(!user){
            return res.status(200).send({ status: 'No existe el usuario' });
        }

        const routine = await habitModel.findById(idHabit);
        if(!routine){
            return res.status(200).send({ status: 'No existe el registro del hábito' });
        }

        if(user.favouriteHabit.includes(idHabit)){
            return res.status(200).send({ status: 'La rutina diaria ya está en favoritos' });
        }


        user.favouriteHabit.push(idHabit);
        user.save()

        res.status(200).send({ status: "Success", data: user });

    } catch (error) {
        res.status(500).send({ status:"Failed", error: error.message });
    }
}


const removeFavouriteRoutine = async (req, res) =>{
    try {
        const { idUser, idHabit } = req.params; 
        const user = await userModel.findById(idUser);
        if(!user){
            return res.status(200).send({ status: 'No existe el usuario' });
        }

        if(!user.favouriteHabit.includes(idHabit)){
            return res.status(200).send({ status: 'La rutina diaria NO está en favoritos' });
        }

        //pull me elimina array
        user.favouriteHabit.pull(idHabit);
        user.save();

        res.status(200).send({ status: "Success", data: user });

    } catch (error) {
        res.status(500).send({ status:"Failed", error: error.message });
    }
}

module.exports = {
    getAllUser,
    getUserById,
    deleteUSer,
    updateUser,
    addFavouriteRoutine,
    removeFavouriteRoutine
};