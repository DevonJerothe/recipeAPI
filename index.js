const express = require("express");
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

//Handle routes
const router = require("./routes/route");

const app = express();

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
const {mongoURI} = require('./constants')
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        mongoURI,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected")
    );

} catch (e) {
    console.log("could not connect");
}

app.use('/api', router)
app.get('/', (req, res) => {
    res.send("Use /api or /api-docs")
})

app.listen(3000, () => {
    console.log("Listening on PORT 3000")
})