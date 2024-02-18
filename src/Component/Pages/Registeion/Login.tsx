/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Login.tsx
import React, { useState } from "react";
import { useLoginMutation } from "../../../Redux/features/auth/authApi";
import { TUser, setUser } from "../../../Redux/features/auth/authSlice";
import { verifyToken } from "../../../Hooks/verifyToken";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Redux/hook";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading, isError, error }] = useLoginMutation();

  // Define a helper function to extract error text
  const getErrorText = (error: any): string => {
    if (error && "message" in error && error.message) {
      return error.message;
    }

    // Handle other types of errors or undefined
    return "An unexpected error occurred";
  };

  const handleLogin = async () => {
    try {
      const userInfo = {
        username: username,
        password: password,
      };

      const res = await login(userInfo).unwrap();
      console.log("Backend Response:", res);
      const user = verifyToken(res.data.accessToken) as TUser;

      // Assuming you have a setUser action in your Redux slice
      dispatch(setUser({ user: user, token: res.data.accessToken }));

      // Use SweetAlert2 for success message
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You have been successfully logged in.",
      });
      navigate(`/${user.role}/dashboard`);
      //navigate(`/product`);
    } catch (err) {
      console.error("Login failed", err);

      // Use SweetAlert2 for error message
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="avatar card-actions justify-center">
          <div className="w-24 rounded-xl">
            <img src=" https://i.pinimg.com/736x/0e/99/57/0e995765397e7594f1587413659c8e70.jpg" />
          </div>
        </div>

        <h2 className="text-2xl text-center font-bold mb-6">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-6"
        />
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {isError && (
          <div className="text-red-500 text-sm mt-2">
            Error: {getErrorText(error)}
          </div>
        )}
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <a href="/registration" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
