import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

function ExpenseChart({ expenses }) {

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28CFF",
    "#FF6B6B",
    "#4CAF50",
    "#9C27B0",
    "#03A9F4",
    "#E91E63",
  ];

  // ---------------- ALL EXPENSES ----------------

  const groupedData = expenses.map(
    (expense) => ({
      name: expense.title,
      value: Number(expense.amount),
    })
  );

  // ---------------- TOTAL ----------------

  const total = groupedData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (

    <div
      className="
      bg-white
      dark:bg-gray-800
      p-6
      rounded-2xl
      shadow
      mt-10
      transition-all
      duration-300
    "
    >

      {/* HEADER */}

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
      "
      >

        <h2 className="text-2xl font-bold">
          Expense Analytics
        </h2>

        <div
          className="
          text-sm
          text-gray-500
          dark:text-gray-400
        "
        >
          Total: ₹{total}
        </div>

      </div>

      {/* EMPTY STATE */}

      {groupedData.length === 0 ? (

        <div className="text-center py-10">

          <p className="text-5xl mb-3">
            📊
          </p>

          <p className="text-gray-400">
            No data to display
          </p>

        </div>

      ) : (

        <div
          style={{
            width: "100%",
            height: 450,
          }}
        >

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={groupedData}

                dataKey="value"

                nameKey="name"

                outerRadius={140}

                label={({
                  name,
                  percent,
                }) =>
                  `${name} ${(
                    percent * 100
                  ).toFixed(0)}%`
                }
              >

                {groupedData.map(
                  (_, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
}

export default ExpenseChart;