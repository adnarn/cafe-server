const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },  // Add price field
});

const Expense = mongoose.model('Expenses', expenseSchema);
module.exports = Expense;