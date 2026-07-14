export const categorizeExpense = async (title) => {
  const text = title.toLowerCase();

  if (text.includes("food") || text.includes("pizza")) return "Food";
  if (text.includes("uber") || text.includes("bus")) return "Transport";
  if (text.includes("movie")) return "Entertainment";
  if (text.includes("rent")) return "Housing";

  return "Other";
};