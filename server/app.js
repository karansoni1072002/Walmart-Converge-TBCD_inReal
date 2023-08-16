const express = require('express')
const app = express()
const port = 3000
const userRoutes = require("./router/user");

app.use(express.json());

app.use('/api', userRoutes)
app.listen(port, () => console.log(`Server started on ${port}!`))