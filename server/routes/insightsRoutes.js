const express = require("express");

const Expense =
  require("../models/Expense");

const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const expenses =
        await Expense.find({
          user: req.user,
        });

      const total =
        expenses.reduce(
          (sum, e) =>
            sum + e.amount,
          0
        );

      const categoryMap = {};

      expenses.forEach((e) => {

        categoryMap[e.category] =
          (categoryMap[e.category] || 0)
          + e.amount;
      });

      const topCategory =
        Object.keys(categoryMap).reduce(
          (a, b) =>
            categoryMap[a] >
            categoryMap[b]
              ? a
              : b,
          "None"
        );

      let insight = "";

      if (total > 10000) {

        insight =
          "⚠ You are spending too much overall this month.";

      } else {

        insight =
          "✅ Your spending is under control.";
      }

      const advice =
        `Your top spending category is ${topCategory}. Try reducing expenses here.`;

      res.json({
        total,
        topCategory,
        insight,
        advice,
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