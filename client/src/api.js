import axios from "axios";

const API = "http://localhost:5000/api";

export const getToken = () => localStorage.getItem("token");

export const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// Expenses APIs
export const fetchExpenses = () =>
  axios.get(`${API}/expenses`, authHeader());

export const addExpense = (data) =>
  axios.post(`${API}/expenses`, data, authHeader());

export const deleteExpense = (id) =>
  axios.delete(`${API}/expenses/${id}`, authHeader());