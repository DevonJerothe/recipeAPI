const express = require("express");
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

//Handle routes
const router = require("./routes/route");

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Recipe API',
            version: '1.0.0',
        },
    },
    apis: ['./routes*.js'], // files containing annotations as above
};
const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


//Connect to MongoDB
const constants = require('./constants');
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        `mongodb+srv://${constants.mongoUser}:${constants.mongoPass}@recipeapp.q9i0u.mongodb.net/${constants.mongoDB}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected")
    );

} catch (e) {
    console.log("could not connect");
}

app.use('/', router)

app.listen(3000, () => {
    console.log("Listening on PORT 3000")
})