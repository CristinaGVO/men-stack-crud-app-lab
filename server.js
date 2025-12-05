const dotenv = require("dotenv"); // require package
dotenv.config();

// Here is where we import modules

// We begin by loading Express
const express = require('express');
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: false }));

// importando el modelo de clothe para crear, leer,actualizar y eliminar

const Clothe = require('./models/clothes.js');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});



//conection de string


//Rutas

// GET 

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// server.js

// GET /fruits/new
app.get("/clothes/new", (req, res) => {
  res.render("clothes/new.ejs");
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});

