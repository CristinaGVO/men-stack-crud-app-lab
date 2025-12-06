const mongoose = require('mongoose')

const clotheSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Nombre de la prenda: Camiseta, pantalón, vestido, etc.
  size: { type: String },
  brand: { type: String},                     
  color: { type: String },
  inStock: { type: Boolean },
});

const Clothe = mongoose.model('Clothe', clotheSchema); // cree el modelo en mongoose
module.exports = Clothe;
