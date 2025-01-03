const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  customer: String,
  comment: String,
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const ItemModel = mongoose.model('Item', ItemSchema);
module.exports = ItemModel;
