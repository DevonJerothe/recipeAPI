import express from 'express';

const app = express();
const recipeRoute = require('./routes/recipes.js');

app.use(recipeRoute, '/recipes')
