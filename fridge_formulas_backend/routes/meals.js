const router = require("express").Router();
const {authorize} = require("../middlewares/auth")
const {validateMealPlanIds} = require("../middlewares/validation");
const {
  generateMealPlan,
  getUserMealPlans,
  deleteUserMealPlanSingle,
} = require("../controllers/mealplans");

router.post("/users/me/mealplans",authorize, generateMealPlan);
router.get("/users/me/mealplans",authorize, getUserMealPlans);
router.delete("/users/me/mealplans",authorize,validateMealPlanIds,deleteUserMealPlanSingle);
module.exports = router;
