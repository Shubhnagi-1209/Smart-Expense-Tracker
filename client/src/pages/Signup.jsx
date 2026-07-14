import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Signup() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {

    try {

      setError("");

      await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      alert("Signup successful");

      navigate("/");

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.msg
        || "Signup failed"
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
        bg-white
        dark:bg-gray-800
        p-8
        rounded-2xl
        shadow-2xl
        w-96
        transition-all
        duration-300
      "
      >

        <h1
          className="
          text-3xl
          font-bold
          mb-6
          text-center
        "
        >
          Signup
        </h1>

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
          type="text"
          placeholder="Name"

          className="
          w-full
          p-3
          border
          rounded-lg
          mb-4
          bg-white
          dark:bg-gray-700
          dark:text-white
          focus:outline-none
        "

          value={name}

          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"

          className="
          w-full
          p-3
          border
          rounded-lg
          mb-4
          bg-white
          dark:bg-gray-700
          dark:text-white
          focus:outline-none
        "

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"

          className="
          w-full
          p-3
          border
          rounded-lg
          mb-6
          bg-white
          dark:bg-gray-700
          dark:text-white
          focus:outline-none
        "

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleSignup}

          className="
          w-full
          bg-green-600
          hover:bg-green-700
          text-white
          p-3
          rounded-lg
          transition-all
          duration-300
          font-semibold
        "
        >
          Signup
        </button>

      </div>

    </div>
  );
}

export default Signup;