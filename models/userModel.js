const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  lastName: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: [true, "El correo ya existe"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  role: {
    type: String,
    enum: ["user"],
    default: "user"
  },
},{
    timestamps: true
  });

/*
userSchema.pre(/^find/, function (next){
  //parq que solo muestre los activos
  this.find({ isActive: true})
  next()
})
  */

const userModel = mongoose.model("User", userSchema, "user");

module.exports = userModel;