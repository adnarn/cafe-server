const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    price: Number,
    time: String,
    date: { type: Date, default: Date.now } 

}, {timestamps: true})

const ItemModel = mongoose.model('items' , ItemSchema)
module.exports = ItemModel