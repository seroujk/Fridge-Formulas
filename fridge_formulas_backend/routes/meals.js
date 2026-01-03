const router = require("express").Router();
const {authorize} = require("../middlewares/auth")
const {
  generateMealPlan,
  getUserMealPlan,
} = require("../controllers/mealplans");

router.post("/users/me/mealplans",authorize, generateMealPlan);
router.get("/users/me/mealplans",authorize, getUserMealPlan);

module.exports = router;
