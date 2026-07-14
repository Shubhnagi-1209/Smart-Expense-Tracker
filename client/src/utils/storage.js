const KEY = "expenses";

export const saveExpenses = (expenses) => {
  localStorage.setItem(KEY, JSON.stringify(expenses));
};

export const loadExpenses = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};