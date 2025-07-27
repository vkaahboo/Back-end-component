const express = require("express");
const router = express.Router();
const {
    getAllUser,
    getUserById,
    deleteUSer,
    updateUser,
    addFavouriteRoutine,
    removeFavouriteRoutine
} = require("../controllers/userController");
const verifyToken = require("../middlewares/auth");

//RUTAS
router.get("/", getAllUser);
router.get("/", verifyToken, getUserById);
router.delete("/:idUser", deleteUSer);
router.patch("/:idUser", updateUser);

//rutinas favoritas
router.patch("/:idUser/diaryHabits/:idHabit", addFavouriteRoutine);
router.delete("/:idUser/diaryHabits/:idHabit", removeFavouriteRoutine);





module.exports = router;

/*
http://localhost:3000/api/user   addUser



para buscar por nombre
router.get("/searchName/:name", getUserByName)

const getUserByName = async (req,res) =>{
    try {
        const name = req.params.name;
        const users = await userModel.find({ name: { $regex: name, $options: 'i' }})
        if(users.length === 0){
            res.status(200).send({ status: 'No existe el usuario' }); 
        }
        res.status(200).send({ status: "Success", data: users});

    } catch (error) {
        res.status(500).send({ status:"Failed", error: error.message });
    }
}
*/