import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "userId",
        res.data.userId
      );

      navigate("/dashboard");

    } catch (err) {

      setError(
        err.response?.data?.msg
        || "Login failed"
      );
    }
  };

  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      dark:bg-gray-900
      transition-all
      duration-300
    "
    >

      <div
        className="
        p-8
        bg-white
        dark:bg-gray-800
        shadow-2xl
        rounded-2xl
        w-96
        transition-all
        duration-300
      "
      >

        <h2
          className="
          text-3xl
          font-bold
          mb-6
          text-center
        "
        >
          Login
        </h2>

        {error && (

          <p
            className="
            text-red-500
            mb-4
            text-center
          "
          >
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"

          className="
          border
          p-3
          w-full
          mb-4
          rounded-lg
          bg-white
          dark:bg-gray-700
          dark:text-white
          focus:outline-none
        "

          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"

          className="
          border
          p-3
          w-full
          mb-6
          rounded-lg
          bg-white
          dark:bg-gray-700
          dark:text-white
          focus:outline-none
        "

          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}

          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          p-3
          w-full
          rounded-lg
          transition-all
          duration-300
          font-semibold
        "
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;