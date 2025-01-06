const express = require("express");
const expenseRouter = express.Router();
const { getExpense, addExpense, deleteExpense } = require("../controllers/expense");

// Route to get all expenses
expenseRouter.get("/get-expense", getExpense);

// Route to add a new expense
expenseRouter.post("/add-expense", addExpense);

// Route to delete an expense by ID
expenseRouter.delete("delete-expense/:id", deleteExpense);

module.exports = expenseRouter;
