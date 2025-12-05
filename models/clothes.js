const mongoose = require('mongoose')

const clotheSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Nombre de la prenda
  category: { type: String, required: true },   // Camiseta, pantalón, vestido, etc.
  size: { type: String },                       // S, M, L...
  color: { type: String },
  price: { type: Number, min: 0 },
  inStock: { type: Boolean, default: true },    // Disponible o no
  image: String,                                // URL de imagen
  description: String                           // Descripción de la prenda
});

const Clothe = mongoose.model('Clothe', clotheSchema); // cree el modelo en mongoose
module.exports = Clothe;
