var express = require('express');
var router = express.Router();

//Handle routes
const recipeRoute = require("../routes/recipes");

router.use('/recipe', recipeRoute)

module.exports = router;

