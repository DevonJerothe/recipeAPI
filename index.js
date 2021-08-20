const express = require("express");
const { urlencoded } = require("express");
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")
const morgan = require("morgan")
const router = require("./routes/route");
require('dotenv').config()

//constructors
const app = express();
app.use(urlencoded({extended: true}))
app.use(morgan('dev'))
app.use('/api', router)

//Create swagger docs
const swaggerOptions = {
    definition: {
        swagger: '2.0',
        info: {
            title: 'Recipe API',
            version: '1.0.0',
            contact: {
                name: 'Devon Jerothe',
                url: 'https://github.com/DevonJerothe',
                email: 'Devonjerothe@gmail.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000/api/'
            }
        ],
    },
    apis: ['./routes/*.js'], // files containing annotations as above
};
const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

//Connect to MongoDB
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected")
    );

} catch (e) {
    console.log("could not connect");
}

app.listen(3000, () => {
    console.log("Listening on PORT 3000")
})