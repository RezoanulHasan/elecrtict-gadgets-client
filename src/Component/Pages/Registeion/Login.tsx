// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const [error, setError] = useState<string | null>(null); // Added state for error handling
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading, isError }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const userInfo = {
        username: username,
        password: password,
      };

      const res = await login(userInfo).unwrap();
      console.log("Backend Response:", res);

      if (!res.data.accessToken) {
        // Set an error message for invalid credentials
        setError("Invalid username or password. Please try again.");
        return;
      }

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
    } catch (err) {
      console.error("Login failed", err);

      // Set the error message for unexpected errors
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="avatar card-actions justify-center">
          <div className="w-24 rounded-xl">
            <img
              src="https://i.pinimg.com/736x/0e/99/57/0e995765397e7594f1587413659c8e70.jpg"
              alt="avatar"
            />
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
          <div className="text-red-500 text-lg mt-2">
            Error: {error || "Invalid Username or Password"}
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
