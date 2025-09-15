"use client";
import React, { useState } from "react";
import Link from "next/link";
import AuthLayout from "../AuthLayout";

export default function SigninPage() {
  const [role, setRole] = useState("developer");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyPhone: "",
    companyEmail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { role, ...form });
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8">Signup</h2>

        {/* Role Toggle */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["admin", "developer", "hr", "company"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${role === r
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg mx-auto space-y-6"
        >
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-black placeholder-black"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-black placeholder-black"
          />

          {/* Company Fields */}
          {role === "company" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="companyPhone"
                placeholder="Phone Number"
                value={form.companyPhone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 text-black placeholder-black"
              />
              <input
                type="email"
                name="companyEmail"
                placeholder="Company Email"
                value={form.companyEmail}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 text-black placeholder-black"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-950 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            Signup as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Didn't have an account?{" "}
            <Link
              href="/auth/signup"
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
