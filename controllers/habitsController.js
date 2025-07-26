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

module.exports = {
    addHabit,
    getAllHabits
};