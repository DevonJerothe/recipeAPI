import express from "express";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import models from "./models";
const app = express();

//Handle routes
import recipeRoute from './routes/recipes.js';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Recipe API',
            version: '1.0.0',
        },
    },
    apis: ['server.js'], // files containing annotations as above
};

const swaggerDocs = swaggerJSDoc(swaggerOptions)

//Connect to MongoDB
const constants = require('./constants');
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        constants.mongoURI,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected")
    );

} catch (e) {
    console.log("could not connect");
}

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(recipeRoute, '/recipes')
