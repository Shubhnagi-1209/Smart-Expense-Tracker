function ExpenseCard({
  id,
  title,
  amount,
  deleteExpense
}) {

  return (

    <div
      className="
      bg-white
      dark:bg-gray-800
      p-6
      rounded-2xl
      shadow
      transition-all
      duration-300
    "
    >

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p
        className="
        text-2xl
        text-red-500
        mt-2
      "
      >
        ₹{amount}
      </p>

      <button
        onClick={() =>
          deleteExpense(id)
        }
        className="
        mt-4
        bg-red-500
        hover:bg-red-600
        text-white
        px-4
        py-2
        rounded-lg
        transition-all
      "
      >
        Delete
      </button>

    </div>
  );
}

export default ExpenseCard;