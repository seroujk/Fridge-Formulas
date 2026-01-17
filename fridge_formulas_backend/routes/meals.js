const router = require("express").Router();
const {authorize} = require("../middlewares/auth")
const {validateMealPlanIds} = require("../middlewares/validation");
const {
  generateMealPlan,
  getUserMealPlans,
  deleteUserMeal,
  saveUserMealPlans,
} = require("../controllers/mealplans");

router.post("/mealplans", generateMealPlan);
router.post("/users/me/mealplans",authorize, saveUserMealPlans)
router.get("/users/me/mealplans",authorize, getUserMealPlans);
router.delete("/users/me/mealplans/:mealId", authorize, deleteUserMeal);
module.exports = router;
