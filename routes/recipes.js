const express = require("express");
const router = express.Router();
const controller = require("../controllers/recipesController");
//import { recipesController } from "../controllers/recipesController.js"

router.get("/", controller.getRecipe)
router.get("/random", controller.getRandom);
router.get("/favorite", controller.getFavorites);

module.exports = router;