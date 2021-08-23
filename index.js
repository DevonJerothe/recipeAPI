const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express")
const morgan = require("morgan")
const router = require("./routes/route");
require('dotenv').config()

//constructors
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use('/api', router)

//Create swagger docs
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

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