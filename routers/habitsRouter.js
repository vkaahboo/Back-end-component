const express = require("express");
const router = express.Router();
const {
    addHabit,
    getAllHabits
} = require("../controllers/habitsController");

//RUTAS
router.post("/", addHabit);
router.get("/", getAllHabits);


/*
router.get("/", getAllUser);
router.get("/:idUser", getUserById);
router.delete("/:idUser", deleteUSer);
router.patch("/:idUser", updateUser);
*/




module.exports = router;