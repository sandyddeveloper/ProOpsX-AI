"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import AuthLayout from "../AuthLayout";
import useAuthForm from "@/hooks/useAuthForm";
import { ToastContainer } from "react-toastify";
import { showToast, ToastType } from "@/util/toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";


export default function SigninPage() {
  const { form, handleChange, handleSubmit, loading, message } = useAuthForm({
    url: "http://localhost:8080/api/auth/signin",
    onSuccessRedirect: "/dashboard",
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
      <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Sign In</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-6">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username || ""}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password || ""}
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
