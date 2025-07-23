const mongoose = require("mongoose")
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');


const connectToDatabase = async () => {
  try {
    const URL_MONGO = process.env.URL_MONGO
    await mongoose.connect(URL_MONGO)
    
      userModel.where('role').equals('user').then(async result => {

        if(result.length != 0){
          return
        }
        const password = await bcrypt.hash('1234', 10)
        const newUser = {
            name: 'admin',
            lastName: 'admin',
            email: 'admin@email.com',
            password: password,
            role: 'user'
        }

        userModel.create(newUser)
      })

    console.log("Conexión a mongoDB exitosa")
  } catch (error) {
    console.log("Error al conectar con mongoDB", error)
  }
}



module.exports = connectToDatabase;