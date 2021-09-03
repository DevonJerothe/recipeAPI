const RecipeModel = require('../models/recipeModel');

exports.getRecipe = async (req, res) => {
    const {id} = req.params
    const recipes = await RecipeModel.findById(id)
    if (recipes == null) {
        return res.status(404).send({
            message: "Recipe not Found."
        })
    }
    res.send(recipes)
}

exports.getRandom = async (req, res) => {
    const {rows, page} = req.params;
    const course = req.query.course.toLowerCase();

    if (course == null || rows == null || page == null) {
        return res.status(500).send({
            message: "course rows and page are required"
        })
    }

    const results = await RecipeModel.find({course: course})
        .skip(rows * page)
        .limit(rows * 1)
        .select('name img rating ready_in calories');

    if (results == null) {
        return res.status(404).send({
            message: "recipes not found"
        })
    }

    return res.send({
        rows: rows,
        page: page,
        results: results
    })
}

exports.getFavorites = (req, res) => {
    res.send("WIP")
}

