import React, { useState, useContext } from "react";
import axios from "../auth/axiosConfig";
import InputField from "../components/InputField";
import AuthContext from "../store/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/projectMentoring/login", formData);
      login(response.data.additional);
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-left text-3xl font-bold text-gray-900">Login</h2>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
          <InputField
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-3 text-white font-bold transition-all duration-200 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
