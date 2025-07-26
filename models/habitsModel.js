const mongoose = require('mongoose');
const dayjs = require('dayjs');

const Schema = mongoose.Schema;

const habitsSchema = new Schema({
    habitName: {
        type: String,
        required: [true, "El nombre es obligatorio"],
  },
    description: {
        type: String,
        required: [true, "Escribir descripción del hábito"],
  },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
  },
    completedHabit: {
        type: Boolean,
        default: false
  }
}, {
  timestamps: {
      createdAt: 'creationDate', 
      updatedAt: 'modifiedDate'
    }
});

//Modifica el formato de fecha con dayjs
habitsSchema.set('toJSON', {
  transform: (doc, ret) => {
    if (ret.creationDate) {
      ret.creationDate = dayjs(ret.creationDate).format('DD/MM/YYYY');
    }
    if (ret.modifiedDate) {
      ret.modifiedDate = dayjs(ret.modifiedDate).format('DD/MM/YYYY');
    }
    return ret;
  }
});

/*
habit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habito',
        required: true
*/

const habitsModel = mongoose.model("Habit", habitsSchema, "habit");

module.exports = habitsModel;