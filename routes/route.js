var express = require('express');
var router = express.Router();

//Handle routes
const recipeRoute = require("../routes/recipes");
const userRoute = require("../routes/user")

router.use('/recipe', recipeRoute)
router.use('/user', userRoute)

module.exports = router;

