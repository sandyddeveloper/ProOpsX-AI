"use client";
import React from "react";

interface DateDividerProps {
  label: string;
}

export function DateDivider({ label }: DateDividerProps) {
  return (
    <div className="flex items-center my-6">
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      <div className="px-4 py-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full mx-2">
        {label}
      </div>
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}
