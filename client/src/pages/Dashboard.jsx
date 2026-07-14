import { useEffect, useState } from "react";
import axios from "axios";

import ExpenseChart from "../components/ExpenseChart";

function Dashboard() {

  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const [insights, setInsights] = useState(null);

  const [loading, setLoading] = useState(false);

  // ✅ ALERT STATE
  const [showBudgetAlert, setShowBudgetAlert] =
    useState(false);

  const token = localStorage.getItem("token");

  // ---------------- FETCH EXPENSES ----------------

  const fetchExpenses = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/expenses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExpenses(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  // ---------------- ADD EXPENSE ----------------

  const addExpense = async () => {

    if (!title || !amount) return;

    try {

      await axios.post(
        "http://localhost:5000/api/expenses",
        {
          title,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ BUDGET ALERT

      if (
        total + Number(amount) > budget
      ) {

        setShowBudgetAlert(true);

        setTimeout(() => {

          setShowBudgetAlert(false);

        }, 2000);
      }

      setTitle("");
      setAmount("");

      fetchExpenses();

      fetchInsights();

    } catch (err) {

      console.log(err);
    }
  };

  // ---------------- DELETE EXPENSE ----------------

  const deleteExpense = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/expenses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchExpenses();

      fetchInsights();

    } catch (err) {

      console.log(err);
    }
  };

  // ---------------- AI INSIGHTS ----------------

  const fetchInsights = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/insights",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInsights(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  // ---------------- LOAD DATA ----------------

  useEffect(() => {

    fetchExpenses();

    fetchInsights();

  }, []);

  // ---------------- TOTAL ----------------

  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  // ---------------- BUDGET ----------------

  const budget = 5000;

  return (

    <div
      className="
      min-h-screen
      bg-gray-100
      dark:bg-gray-900
      text-black
      dark:text-white
      p-6
      transition-all
      duration-300
    "
    >

      {/* HEADER */}

      <h1 className="text-4xl font-bold mb-6">
        Expense Dashboard
      </h1>

      {/* AI INSIGHTS */}

      {insights && (

        <div
          className="
          bg-yellow-100
          dark:bg-yellow-900
          border
          border-yellow-400
          dark:border-yellow-700
          p-4
          rounded-lg
          mb-6
        "
        >

          <h2 className="text-2xl font-bold mb-2">
            🤖 AI Insights
          </h2>

          <p className="mb-2">
            Total Spending: ₹{insights.total}
          </p>

          <p className="mb-2">
            {insights.insight}
          </p>

          <p>
            {insights.advice}
          </p>

        </div>
      )}

      {/* TOTAL CARD */}

      <div
        className="
        bg-blue-600
        text-white
        p-6
        rounded-2xl
        shadow
        mb-6
      "
      >

        <h2 className="text-2xl font-bold">
          Total Spending
        </h2>

        <p className="text-4xl mt-3">
          ₹{total}
        </p>

      </div>

      {/* ✅ BUDGET ALERT */}

      {showBudgetAlert && (

        <div
          className="
          bg-red-100
          dark:bg-red-900
          border
          border-red-500
          text-red-700
          dark:text-red-200
          p-4
          rounded-lg
          mb-6
          animate-pulse
        "
        >

          ⚠ Budget exceeded!

        </div>
      )}

      {/* ADD EXPENSE */}

      <div
        className="
        bg-white
        dark:bg-gray-800
        p-6
        rounded-2xl
        shadow
        mb-6
      "
      >

        <h2 className="text-2xl font-bold mb-4">
          Add Expense
        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Expense Title"
            className="
            border
            p-3
            rounded-lg
            flex-1
            bg-white
            dark:bg-gray-700
            dark:text-white
          "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            className="
            border
            p-3
            rounded-lg
            flex-1
            bg-white
            dark:bg-gray-700
            dark:text-white
          "
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={addExpense}
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-6
            py-3
            rounded-lg
            transition-all
          "
          >
            Add
          </button>

        </div>

      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* EXPENSE LIST */}

        <div
          className="
          bg-white
          dark:bg-gray-800
          p-6
          rounded-2xl
          shadow
        "
        >

          <h2 className="text-2xl font-bold mb-4">
            Expenses
          </h2>

          {loading ? (

            <p>Loading...</p>

          ) : expenses.length === 0 ? (

            <p className="text-gray-400">
              No expenses added
            </p>

          ) : (

            expenses.map((e) => (

              <div
                key={e._id}
                className="
                flex
                justify-between
                items-center
                border-b
                border-gray-300
                dark:border-gray-700
                py-3
              "
              >

                <div>

                  <p className="font-semibold text-lg">
                    {e.title}
                  </p>

                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {e.category}
                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <p className="font-bold">
                    ₹{e.amount}
                  </p>

                  <button
                    onClick={() => deleteExpense(e._id)}
                    className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-3
                    py-1
                    rounded-lg
                    transition-all
                  "
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

        {/* CHART */}

        <div
          className="
          bg-white
          dark:bg-gray-800
          p-4
          rounded-2xl
          shadow
        "
        >

          <ExpenseChart expenses={expenses} />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;