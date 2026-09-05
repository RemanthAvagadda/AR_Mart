const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
 name: { type: String, require: true, unique: true },
 price: { type: Number, require: true },
 category: { type: String, require: true },
 description: { type: String, require: true },
 image: { type: String, require: true },
 quantity: { type: Number, require: true },
 rating: { type: Number, require: true },
 createdAt: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Product', productSchema)