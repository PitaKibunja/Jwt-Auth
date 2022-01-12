const express = require('express')
const morgan = require('morgan')
const auth=require("./routes/auth")

const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use("/auth", auth)

// app.use()

//start the server
app.listen(3300, () => {
    console.log("Now running the server at port 3300")
})