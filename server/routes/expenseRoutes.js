const express = require("express");

const router = express.Router();

const Expense =
  require("../models/Expense");

const authMiddleware =
  require("../middleware/authMiddleware");

// GET ALL EXPENSES

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const expenses =
        await Expense.find({
          user: req.user,
        });

      res.json(expenses);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        msg: "Server error",
      });
    }
  }
);

// ADD EXPENSE

router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const { title, amount } =
        req.body;

      let category = "General";

      const lowerTitle =
        title.toLowerCase();

      if (
        lowerTitle.includes("food")
      ) {
        category = "Food";
      }

      else if (
        lowerTitle.includes("travel")
      ) {
        category = "Travel";
      }

      else if (
        lowerTitle.includes("shop")
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

      res.status(201).json(expense);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        msg: "Server error",
      });
    }
  }
);

// DELETE EXPENSE

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await Expense.findByIdAndDelete(
        req.params.id
      );

      res.json({
        msg: "Expense deleted",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        msg: "Server error",
      });
    }
  }
);

module.exports = router;