const Expense = require("../models/expense");

// Get all expenses
const getExpense = async (req, res) => {
  try {
    const items = await Expense.find(); // Correct model name
    res.status(200).json(items); // Use proper status code
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error: error.message });
  }
};

// Add a new expense
const addExpense = async (req, res) => {
  try {
    const newExpense = await Expense.create(req.body);
    res.status(201).json(newExpense); // Status 201 for resource creation
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an expense
const deleteExpense = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" }); // Handle non-existent ID
    }
    res.status(200).json({ message: "Expense deleted successfully", deletedExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getExpense,
  addExpense,
  deleteExpense,
};
