const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  trainer_name: { type: String, required: true },
  trainer_location: { type: String, required: true },
  trainer_skills: { type: String, required: true },
  trainer_phone: { type: Number, required: true },
});

module.exports = mongoose.model('Training', trainingSchema);