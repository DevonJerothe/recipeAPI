const express = require("express");
const router = express.Router();
const controller = require("../controllers/recipesController");

/** 
 * @swagger
 * "definitions": {
 *     "Recipe": {
 *         "type": "object",
 *         "properties": {
 *             "url": {
 *                 "type": "string",
 *             },
 *             "name": {
 *                 "type": "string",
 *             },
 *             "img": {
 *                 "type": "string",
 *             },
 *             "rating": {
 *                 "type": "string",
 *             },
 *             "tags": {
 *                 "type": "array",
 *                 "items": {
 *                     "type": "string",
 *                 }
 *             },
 *             "course": {
 *                 "type": "array",
 *                 "items": {
 *                     "type": "string",
 *                 }
 *             },
 *             "ingredients": {
 *                 "type": "array",
 *                 "items": {
 *                     "type": "string",
 *                 }
 *             },
 *             "directions": {
 *                 "type": "array",
 *                 "items": {
 *                     "type": "string",
 *                 }
 *             },
 *             "prep": {
 *                 "type": "string",
 *             },
 *             "cook": {
 *                 "type": "string",
 *             },
 *             "ready in": {
 *                 "type": "string",
 *             },
 *             "servings": {
 *                 "type": "string",
 *             },
 *             "calories": {
 *                 "type": "string",
 *             },
 *             "nutrition": {
 *                 "type": "object",
 *                 "properties": {
 *                     "protein": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "carbohydrates": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "dietary_fiber": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "sugars": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "fat": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "saturated_fat": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "cholesterol": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "vitamin_a_iu": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "niacin_equivalents": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "vitamin_b6": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "vitamin_c": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "folate": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "calcium": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "iron": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "magnesium": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "potassium": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "sodium": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "thiamin": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     },
 *                     "calories_from_fat": {
 *                         "type": "object",
 *                         "properties": {
 *                             "nutrient_value": {
 *                                 "type": "string",
 *                             },
 *                             "daily_value": {
 *                                 "type": "string",
 *                             }
 *                         }
 *                     }
 *                 }
 *             },
 *         }
 *     }
 * }
 */

/**
 * @swagger 
 * tags: 
 *   name: Recipes
 *   description: Recipies API 
 */



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
router.get("/:id", controller.getRecipe)

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