// LoginForm.tsx
import React, { useState } from "react";
import { useLoginMutation } from "../../../Redux/features/auth/authApi";
import { verifyToken } from "../../../Hooks/verifyToken";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

import { setUser } from "../../../Redux/features/auth/authSlice";
import { useAppDispatch } from "../../../Redux/hook";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [loginMutation, { isError, error }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await loginMutation({ username, password });

      console.log("Response:", response);

      if (response.data && response.data.accessToken) {
        console.log("Token:", response.data.accessToken); // Log the token
        const user = verifyToken(response.data.accessToken) as TUser;
        dispatch(setUser({ user, token: response.data.accessToken }));
        navigate(from, { replace: true });

        Swal.fire({
          icon: "success",
          title: "Sign In Successful",
          text: "Welcome!",
          position: "top",
          showConfirmButton: false,
          timer: 1500,
        });

        // Clear password field after successful login
        setPassword("");
      } else {
        console.error("Invalid token format", response?.data?.accessToken);
        throw new Error("Invalid token format");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (error: any): string => {
    return error.response?.data?.message || "Something went wrong";
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      {loading && <div className="mb-4">Logging in...</div>}
      {isError && (
        <div className="text-red-500 mb-4">Error: {getErrorMessage(error)}</div>
      )}
      <form>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
