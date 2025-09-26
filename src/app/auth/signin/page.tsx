"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import AuthLayout from "../AuthLayout";

export default function SigninPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Request with credentials so HttpOnly cookie is set
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        { username: form.username, password: form.password },
        { withCredentials: true } // ✅ critical
      );

      setMessage("Login successful ✅ Redirecting...");
      setTimeout(() => window.location.href = "/dashboard", 1000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Sign In</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-6">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-950 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {message && (
            <p className={`text-center text-sm mt-4 ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-green-600 hover:text-green-700 font-medium">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
