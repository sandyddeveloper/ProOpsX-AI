"use client";
import React, { useState, DragEvent } from "react";
import Link from "next/link";
import AuthLayout from "../AuthLayout";

export default function SignupPage() {
  const [role, setRole] = useState("developer");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    industryType: "",
    website: "",
    employees: "",
    companyLogo: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setForm({ ...form, companyLogo: file });
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { role, ...form });
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 ">
        <h2 className="text-3xl font-bold text-center mb-6 sm:mb-8">Signup</h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["admin", "developer", "hr", "company"].map((r) => (
            <button
              key={r}
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

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 sm:py-3 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 sm:py-3 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
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
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 sm:py-3 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          {role === "company" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={form.companyName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="text"
                  name="companyAddress"
                  placeholder="Company Address"
                  value={form.companyAddress}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="text"
                  name="companyPhone"
                  placeholder="Phone Number"
                  value={form.companyPhone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="email"
                  name="companyEmail"
                  placeholder="Company Email"
                  value={form.companyEmail}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <select
                  name="industryType"
                  value={form.industryType}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="">Select Industry Type</option>
                  <option value="IT">IT</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                </select>
                <input
                  type="text"
                  name="website"
                  placeholder="Website (optional)"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="number"
                  name="employees"
                  placeholder="Number of Employees"
                  value={form.employees}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                />

                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 sm:p-6 cursor-pointer bg-gray-50 hover:bg-gray-100 transition w-full"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById("companyLogo")?.click()}
                >
                  <input
                    type="file"
                    id="companyLogo"
                    name="companyLogo"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                  {form.companyLogo ? (
                    <img
                      src={URL.createObjectURL(form.companyLogo)}
                      alt="Company Logo Preview"
                      className="h-20 w-20 object-cover rounded-lg border"
                    />
                  ) : (
                    <p className="text-gray-500 text-center text-sm">
                      Drag & Drop Logo <br /> or{" "}
                      <span className="text-green-600 font-medium">Browse</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-950 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            Signup as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>

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
