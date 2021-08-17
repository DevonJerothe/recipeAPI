const mongoose = require("mongoose");
const {Schema} = mongoose;

const recipeSchema = new Schema({ 
    url: String,
    name: String, 
    img: String, 
    rating: Number,
    tags: [String],
    course: [String],
    ingredients: Map,
    directions: Map,
    prep: String,
    cook: String,
    ready_in: String,
    servings: String,
    calories: Number, 
    nutrition: {
        protein: {
          nutrient_value: String,
          daily_value: String
        },
        carbohydrates: {
          nutrient_value: String,
          daily_value: String
        },
        dietary_fiber: {
          nutrient_value: String,
          daily_value: String
        },
        sugars: {
          nutrient_value: String,
          daily_value: String
        },
        fat: {
          nutrient_value: String,
          daily_value: String
        },
        saturated_fat: {
          nutrient_value: String,
          daily_value: String
        },
        cholesterol: {
          nutrient_value: String,
          daily_value: String
        },
        vitamin_a_iu: {
          nutrient_value: String,
          daily_value: String
        },
        niacin_equivalents: {
          nutrient_value: String,
          daily_value: String
        },
        vitamin_b6: {
          nutrient_value: String,
          daily_value: String
        },
        vitamin_c: {
          nutrient_value: String,
          daily_value: String
        },
        folate: {
          nutrient_value: String,
          daily_value: String
        },
        calcium: {
          nutrient_value: String,
          daily_value: String
        },
        iron: {
          nutrient_value: String,
          daily_value: String
        },
        magnesium: {
          nutrient_value: String,
          daily_value: String
        },
        potassium: {
          nutrient_value: String,
          daily_value: String
        },
        sodium: {
          nutrient_value: String,
          daily_value: String
        },
        thiamin: {
          nutrient_value: String,
          daily_value: String
        },
        calories_from_fat: {
          nutrient_value: String,
          daily_value: String
        }
    }
}, {collection: 'recipies'});

const recipeModel = mongoose.model('Recipe', recipeSchema);