import { useState } from "react";

function ExpenseForm({ addExpense }) {

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!title || !amount)
      return;

    addExpense({
      title,
      amount: Number(amount),
    });

    setTitle("");

    setAmount("");
  };

  return (

    <form
      onSubmit={handleSubmit}

      className="
      bg-white
      dark:bg-gray-800
      p-6
      rounded-2xl
      shadow
      mb-8
      transition-all
      duration-300
    "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-4
        dark:text-white
      "
      >
        Add Expense
      </h2>

      <input
        type="text"

        placeholder="Expense Title"

        value={title}

        onChange={(e) =>
          setTitle(e.target.value)
        }

        className="
        w-full
        p-3
        border
        rounded-lg
        mb-4
        bg-white
        dark:bg-gray-700
        dark:text-white
      "
      />

      <input
        type="number"

        placeholder="Amount"

        value={amount}

        onChange={(e) =>
          setAmount(e.target.value)
        }

        className="
        w-full
        p-3
        border
        rounded-lg
        mb-4
        bg-white
        dark:bg-gray-700
        dark:text-white
      "
      />

      <button
        type="submit"

        className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-6
        py-3
        rounded-lg
        transition-all
      "
      >
        Add Expense
      </button>

    </form>
  );
}

export default ExpenseForm;