const mongoose = require('mongoose');

const selectableItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },  // Add price field
});

const SelectableItem = mongoose.model('SelectableItem', selectableItemSchema);
module.exports = SelectableItem;