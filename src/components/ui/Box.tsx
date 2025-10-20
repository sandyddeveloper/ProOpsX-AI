"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

interface BoxProps {
  title: string;
  count: string | number;
  icon: React.ReactNode;
  progress?: boolean; // true => uptrend, false => downtrend
  percentage?: number;
  trendLabel?: string;
  tag?: string; // e.g. “Active”, “Delayed”
  chartData?: { name: string; uv: number }[];
}

const Box: React.FC<BoxProps> = ({
  title,
  count,
  icon,
  progress = true,
  percentage = 0,
  trendLabel = "Compared to last month",
  tag,
  chartData = [
    { name: "A", uv: 4000 },
    { name: "B", uv: 3800 },
    { name: "C", uv: 3200 },
    { name: "D", uv: 2900 },
    { name: "E", uv: 2600 },
  ],
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg rounded-2xl p-4 flex flex-col justify-between h-full transition-all duration-300"
    >
      {/* --- Top Section: Icon + Info --- */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h4 className="text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
            {title}
          </h4>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {count}
          </h2>
        </div>

        <div className="text-4xl text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-xl">
          {icon}
        </div>
      </div>

      {/* --- Chart --- */}
      <div className="w-full h-[50px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={2} barCategoryGap="30%">
            <Bar dataKey="uv" fill={progress ? "#4f46e5" : "#ef4444"} barSize={6} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* --- Bottom Section: Progress Info --- */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          {progress ? (
            <FaArrowUp className="text-green-500 animate-pulse" />
          ) : (
            <FaArrowDown className="text-red-500 animate-pulse" />
          )}
          <span
            className={`text-sm font-semibold ${
              progress ? "text-green-600" : "text-red-600"
            }`}
          >
            {progress ? "+" : "-"}
            {percentage}%
          </span>
        </div>

        <span className="text-xs text-gray-500 dark:text-gray-400">
          {trendLabel}
        </span>
      </div>

      {/* --- Tag --- */}
      {tag && (
        <span
          className={`mt-3 inline-block px-3 py-1 text-xs font-medium rounded-full ${
            tag === "Active"
              ? "bg-green-100 text-green-600 dark:bg-green-900/40"
              : tag === "Delayed"
              ? "bg-red-100 text-red-600 dark:bg-red-900/40"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800/60"
          }`}
        >
          {tag}
        </span>
      )}
    </motion.div>
  );
};

export default Box;
