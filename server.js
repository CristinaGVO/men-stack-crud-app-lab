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
app.use(express.urlencoded({ extended: false }));


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

// GET 

app.get("/clothes", async (req, res) => {
    const allClothes = await Clothe.find();
    res.render("clothes/index.ejs", { clothes: allClothes });
  });
  

//new clothes
app.get("/clothes/new", (req, res) => {
  res.render("clothes/new.ejs");
});

// POST /clothes
app.post("/clothes", async (req, res) => {
  console.log(req.body);
  if (req.body.inStock === "on") {
    req.body.inStock = true;
} else {
    req.body.inStock = false;
}
await Clothe.create(req.body);
res.redirect("/clothes/new");
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});

