const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema({
  mealDiet:{
    type: String,
    required: true,
  },
  mealTitle: {
    type: String,
    required: true,
  },
  mealIcon: {
    type: String,
    required: true,
  },
  mealInstructions: {
    type: Array,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("mealPlan", mealPlanSchema);
