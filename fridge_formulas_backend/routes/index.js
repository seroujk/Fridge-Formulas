const express = require('express');
const usersRouter = require('./users');
const mealPlansRouter = require('./meals');
const router = express.Router();

router.use(usersRouter);
router.use(mealPlansRouter);


module.exports = router;