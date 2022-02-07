const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors = require('cors')
const userRoutes = require("./routes/user")
const loanRoutes = require("./routes/loan")
dotenv.config()

app.use(cors())
app.use(express.json())
app.use("/api/v1", userRoutes)
app.use("/api/v1", loanRoutes)


// mongodb connection 
mongoose.connect("mongodb://localhost:27017/p2p_db", { useUnifiedTopology: true }).then(
    () => console.log("connection successfull")
).catch(err => console.log(err))




app.listen(5000, () => {
    console.log("Backend server is running!");
})