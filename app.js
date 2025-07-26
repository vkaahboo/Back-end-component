const PORT = 3000;
const express = require('express')
const cors = require('cors')

//rutas de ficheros
const userRouter = require('./routers/userRouter')
const habitRouter = require('./routers/habitsRouter')
//const loginRouter = require('./routers/loginRouter')

//para acceder a las variales de entorno
require("dotenv").config();
const connectToDatabase = require('./db/connectDb');


const app = express();
//app.use(cors({ origin: 'http://localhost:5173' }))  --- api al front
app.use(express.json());

connectToDatabase();

//URLS
app.use('/api/user', userRouter);
app.use('/api/habit', habitRouter);
//app.use('/api/auth', loginRouter)






app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});