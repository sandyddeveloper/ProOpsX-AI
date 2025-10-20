"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { Button } from "@mui/material";


const DashboardHeader = ({ onShowProjects }: { onShowProjects: () => void }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good Morning");
    else if (hours < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/auth/user", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-auto rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-black px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-8 shadow-md"
    >
      {/* Left Section */}
      <div className="flex flex-col gap-4 text-center md:text-left">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-snug">
            {greeting},{" "}
            <span className="">
              {loading
                ? "Loading..."
                : error
                ? "Guest User"
                : user?.username || "User"}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">
            Here’s your dashboard overview. Track progress and manage your
            projects effortlessly.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
          <Button
            onClick={onShowProjects}
            className="!bg-indigo-600 hover:!bg-indigo-700 !text-white !font-semibold px-5 py-2 rounded-lg flex items-center gap-2 shadow-sm"
          >
            <FaPlus size={14} /> View Projects
          </Button>

          <Button
            // variant="outline"
            className="border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 text-gray-700 dark:text-gray-200 !px-5 py-2 rounded-lg"
          >
            Analytics
          </Button>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-[220px] md:w-[260px]"
      >
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/012/329/158/small_2x/data-analysis-graph-and-chart-in-business-dashboard-flat-illustration-purple-and-green-design-concept-vector.jpg"
          alt="Dashboard illustration"
          className="w-full h-auto drop-shadow-md rounded-xl"
        />
      </motion.div>
    </motion.div>
  );
};

export default DashboardHeader;
