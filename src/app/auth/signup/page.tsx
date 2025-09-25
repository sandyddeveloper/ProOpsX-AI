"use client";
import React, { useState, DragEvent } from "react";
import Link from "next/link";
import axios from "axios";
import AuthLayout from "../AuthLayout";

export default function SignupPage() {
  const [role, setRole] = useState("developer");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
        role: [role], // Backend expects array of roles
      });

      setMessage(response.data.message || "User registered successfully!");
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Signup failed!");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-6 sm:mb-8">Signup</h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["admin", "developer", "hr"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                role === r
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-4 sm:space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 sm:py-3 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 sm:py-3 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 sm:py-3 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 sm:py-3 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-950 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold disabled:opacity-50"
          >
            {loading ? "Signing up..." : `Signup as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </button>

          {message && (
            <p
              className={`text-center text-sm mt-4 sm:mt-6 ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-4 sm:mt-6">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
