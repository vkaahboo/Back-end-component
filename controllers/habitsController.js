const habitsModel = require('../models/habitsModel');

//obtener todos las rutinas
const getAllHabits = async (req,res) =>{
    try {
        const habits = await habitsModel.find()
        if(!habits.length === 0){
             res.status(200).send({ status: 'No existe la rutina diaria' }); 
        }
        res.status(200).send({ status: "Success", data: habits});  
    } catch (error) {
        res.status(500).send({ status:"Failed", error: error.message })
    }
};



//crear Habito
const addHabit = async (req,res) =>{
    try {
        const habitData = req.body;
        await habitsModel.create(habitData);
        res.status(200).send({ status: 'Hábito creado exitosamente' });  
    } catch (error) {
        res.status(500).send({ status:"Failed", error: error.message });
    }
};

//borrar habito
const deleteUser = async (req, res) =>{
    try {
        const userId = req.payload._id
        const user = await habitsModel.findByIdAndDelete(userId)
        if(!user){
            return res.status(200).send('No existe ese ID')
        }
        res.status(200).send({ status: 'Success', data: 'Se ha eliminado correctamente' })
    } catch (error) {
        res.status(500).send({ status: 'Failed', error: error.message })
    }
}

//desactivar habito
const deactivateHabit = async (req,res) => {
    try {
        const userId = req.payload._id
        const user = await habitsModel.findByIdAndUpdate(userId, { completedHabit: false }, { new: true})

        if(!user){
            return res.status(200).send('No hay usuario')
        }

        res.status(200).send({ status: 'Success', message: 'Usuario desactivado completamente' })
    } catch (error) {
        res.status(500).send({ status: 'Failed', error: error.message })
    }
}


module.exports = {
    addHabit,
    getAllHabits
};