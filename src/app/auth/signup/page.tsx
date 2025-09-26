"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AuthLayout from "../AuthLayout";
import useAuthForm from "@/hooks/useAuthForm";
import { ToastContainer } from "react-toastify";
import { showToast, ToastType } from "@/util/toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function SignupPage() {
  const [role, setRole] = useState("developer");

  const { form, handleChange, handleSubmit, loading, message } = useAuthForm({
    url: "http://localhost:8080/api/auth/signup",
    onSuccessRedirect: "/auth/signin",
    payloadTransform: (f) => ({
      username: f.username,
      email: f.email,
      password: f.password,
      role: [role],
    }),
    requirePasswordStrength: true,
    requireConfirmPassword: true,
  });

useEffect(() => {
  if (message) {
    const isSuccess = message.toLowerCase().includes("success");
    const type: ToastType = isSuccess ? "success" : "error";

    showToast(message, type, {
      icon: isSuccess
        ? <FaCheckCircle className="text-green-500" />
        : <FaTimesCircle className="text-red-500" />,
    });
  }
}, [message]);
  return (
    <AuthLayout>
      <ToastContainer position="top-right" />
      <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-6 sm:mb-8">Signup</h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["admin", "developer", "hr", "teamlead", "tester", "qA", "client"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                role === r ? "bg-purple-600 text-white" : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-3 text-black focus:ring-2 focus:ring-purple-600"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-3 text-black focus:ring-2 focus:ring-purple-600"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-3 text-black focus:ring-2 focus:ring-purple-600"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-3 text-black focus:ring-2 focus:ring-purple-600"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-950 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold disabled:opacity-50"
          >
            {loading ? "Signing up..." : `Signup as ${role}`}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-green-600 hover:text-green-700 font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
