const mongoose = require('mongoose');

const selectableItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },  // Add price field
});

const SelectableItem = mongoose.model('SelectableItem', selectableItemSchema);
module.exports = SelectableItem;


// const mongoose = require('mongoose');

// const selectableItemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   items: [
//     {
//       type: String,
//       ref: 'Item', // Reference to the Item model
//     },
//     {
//       type: Number,
//       ref: 'price', // Reference to the Item model
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const SelectableItem = mongoose.model('SelectableItem', selectableItemSchema);
// module.exports = SelectableItem;