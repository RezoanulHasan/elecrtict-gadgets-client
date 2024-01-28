/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../Redux/features/auth/authApi";
import useTitle from "../../../Hooks/useTitle";
interface RegistrationFormData {
  username: string;
  email: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    username: "",
    email: "",
    password: "",
  });
  useTitle("Registration from");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const navigate = useNavigate(); //
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    // Check if the password is at least 6 characters long
    if (formData.password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }

    // Check if the password contains at least one uppercase and one lowercase letter
    if (!/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password)) {
      errors.push(
        "Password must contain at least one uppercase letter and one lowercase letter"
      );
    }

    // Check if the username starts with an uppercase letter
    if (!/^[A-Z]/.test(formData.username)) {
      errors.push("Username must start with an uppercase letter");
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      // Display error messages and return if validation fails
      return;
    }

    try {
      setLoading(true);
      const result = await register(formData);
      // Redirect to the product route upon successful registration
      navigate("/product");

      console.log("Registration result:", result);

      // Reset the form
      setFormData({
        username: "",
        email: "",
        password: "",
      });

      // Optionally show a success message
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You have successfully registered.",
      });
    } catch (error) {
      console.error("Error during registration:", error);

      // Optionally show an error message
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Failed to register. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-32   mb-20">
      <h1 className="text-center font-bold  text-4xl "> Registration From</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
      >
        {errorMessages.length > 0 && (
          <div className="text-red-500 mb-4">
            {errorMessages.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            disabled={loading || isLoading}
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            {loading || isLoading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
