const RecipeModel = require('../models/recipeModel');

exports.getRecipe = async (req, res) => {
    const { id } = req.params
    const recipes = await RecipeModel.findById(id)
    console.log(recipes)
    res.send(recipes)
}

exports.getRandom = (req, res) => {
    res.send("WIP")
}

exports.getFavorites = (req, res) => {
    res.send("WIP")
}

