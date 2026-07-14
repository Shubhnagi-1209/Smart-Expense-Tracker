const Expense = require("../models/Expense");

// GET ALL EXPENSES

const getExpenses = async (req, res) => {

  try {

    const expenses =
      await Expense.find({
        user: req.user,
      });

    res.json(expenses);

  } catch (err) {

    res.status(500).json({
      msg: "Server error",
    });
  }
};

// ADD EXPENSE

const addExpense = async (req, res) => {

  try {

    const { title, amount } = req.body;

    let category = "General";

    // Simple AI Categorization

    if (
      title.toLowerCase().includes("food")
    ) {
      category = "Food";
    }

    else if (
      title.toLowerCase().includes("travel")
    ) {
      category = "Travel";
    }

    else if (
      title.toLowerCase().includes("shop")
    ) {
      category = "Shopping";
    }

    const expense =
      await Expense.create({
        title,
        amount,
        category,
        user: req.user,
      });

    res.json(expense);

  } catch (err) {

    res.status(500).json({
      msg: "Server error",
    });
  }
};

// DELETE EXPENSE

const deleteExpense = async (req, res) => {

  try {

    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.json({
      msg: "Expense deleted",
    });

  } catch (err) {

    res.status(500).json({
      msg: "Server error",
    });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  deleteExpense,
};