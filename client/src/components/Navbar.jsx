import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { isLoggedIn, logout } from "../utils/auth";

function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const loggedIn = isLoggedIn();

  return (
    <nav
      className={`px-8 py-4 flex justify-between items-center shadow-md transition-all
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <h1 className="text-2xl font-bold text-blue-600">
        Expense Tracker
      </h1>

      <div className="flex gap-6 items-center">

        {!loggedIn && (
          <>
            <Link to="/" className="hover:text-blue-500">Login</Link>
            <Link to="/signup" className="hover:text-blue-500">Signup</Link>
          </>
        )}

        {loggedIn && (
          <Link to="/dashboard" className="hover:text-blue-500">
            Dashboard
          </Link>
        )}

        {loggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        )}

        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg transition-all
          ${darkMode ? "bg-yellow-400 text-black" : "bg-blue-600 text-white"}`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;