const path = require("path");
const express = require("express");

const publicPath = path.join(__dirname, "/../public");
const app = express();


app.use(express.static(publicPath));

app.listen(3000 || process.env.PORT, ()=>{
    console.log("Server running on Port 3000");
})