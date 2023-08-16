require('dotenv').config();
const express = require('express')
const app = express()
const port = 3000
const userRoutes = require("./router/user");
const { default: mongoose } = require('mongoose');
const { configDotenv } = require('dotenv');

mongoose.connect('mongodb://localhost:27017/TBCD_inReal');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
})

app.use(express.json());

app.use('/api', userRoutes)
app.listen(port, () => console.log(`Server started on ${port}!`))