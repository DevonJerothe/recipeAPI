const express = require("express");
const oAuth = require("../utils/oauth")
const controller = require("../controllers/recipesController");
const router = express.Router();

/**
 * @swagger
 * "/api/recipe/{id}": {
 *     "get": {
 *         "tags": [
 *             "Recipes"
 *         ],
 *         "summary": "Get recipe by ID",
 *         "produces": [
 *             "application/json"
 *         ],
 *         "parameters": [
 *             {
 *                 "in": "path",
 *                 "name": "id",
 *                 "description": "Recipe ID",
 *                 "required": "true",
 *                 "type": "string"
 *             }
 *         ],
 *         "responses": {
 *             "200": {
 *                 "description": "Recipe JSON result",
 *                 "schema": {
 *                     "$ref": "#/definitions/Recipe"
 *                 }
 *             },
 *             "404": {
 *                 "description": "Recipe not found",
 *             }
 *         }
 *     }
 * }
 *
 */
router.get("/:id", oAuth.getToken, controller.getRecipe)

/**
 * @swagger
 * "/api/recipe/random/{count}": {
 *     "get": {
 *         "tags": [
 *             "Recipes"
 *         ],
 *         "summary": "Get random recipes",
 *         "produces": [
 *             "application/json"
 *         ],
 *         "parameters": [
 *             {
 *                 "in": "path",
 *                 "name": "count",
 *                 "description": "Number of recipes to return",
 *                 "required": "true",
 *                 "type": "integer"
 *             }
 *         ],
 *         "responses": {
 *             "200": {
 *                 "description": "Recipe JSON list result",
 *                 "schema": {
 *                     "type": "array",
 *                     "items": {
 *                         "$ref": "#/definitions/Recipe"
 *                     }
 *                 }
 *             },
 *             "404": {
 *                 "description": "No Recipes Found",
 *             }
 *         }
 *     }
 * }
 */
router.get("/random/:count", controller.getRandom);

/**
 * 
 */
router.get("/favorite", controller.getFavorites);

module.exports = router;