const mongoose = require('mongoose')

const clotheSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
});

const Clothe = mongoose.model('Clothe', clotheSchema);
module.exports = Clothe;
