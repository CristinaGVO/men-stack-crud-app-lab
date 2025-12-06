const dotenv = require("dotenv"); // require package
dotenv.config();

// We begin by loading Express
const express = require('express');
const mongoose = require("mongoose");

const methodOverride = require("method-override");
const morgan = require("morgan"); 
const path = require("path");

const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 
app.use(express.static(path.join(__dirname, "public")));
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });


  // importando el modelo de clothe para crear, leer,actualizar y eliminar

  const Clothe = require('./models/clothes.js');

app.get("/", async (req, res) => {
    res.render("index.ejs");
  });


mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


//Rutas diferentes

// GET 

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/clothes", async (req, res) => {
    const allClothes = await Clothe.find();
    res.render("clothes/index.ejs", { clothes: allClothes });
});


//new clothes
app.get("/clothes/new", (req, res) => {
    res.render("clothes/new.ejs");
});

// app.get("/clothes/:clothesId", (req, res) => {
//     res.send(
//       `This route renders the show page for clothe id: ${req.params.clothesId}!`
//     );
//   });


// por ID
app.get("/clothes/:clotheId", async (req, res) => {
    const foundClothe = await Clothe.findById(req.params.clotheId);
    res.render("clothes/show.ejs", { clothe: foundClothe });
});


// POST 
app.post("/clothes", async (req, res) => {
    console.log(req.body);
if (req.body.inStock === "on") {
    req.body.inStock = true;
} else {
    req.body.inStock = false;
}
await Clothe.create(req.body);
res.redirect("/clothes");
});

//delete

app.delete("/clothes/:clotheId", async (req, res) => {
    await Clothe.findByIdAndDelete(req.params.clotheId);
    res.redirect("/clothes");
});


  // GET con las tres partes/clothes/clothesid/edit
app.get("/clothes/:clotheId/edit", async (req, res) => {
    const foundClothe = await Clothe.findById(req.params.clotheId);
res.render("clothes/edit.ejs", {
    clothe: foundClothe,
});
});

// editar los registros

app.put("/clothes/:clotheId", async (req, res) => {

if (req.body.inStock === "on") {
    req.body.inStock = true;
} else {
    req.body.inStock = false;
}
await Clothe.findByIdAndUpdate(req.params.clotheId, req.body);

res.redirect(`/clothes/${req.params.clotheId}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});