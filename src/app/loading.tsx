"use client";
import { Loader } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-black/70">
      <Loader />
    </div>
  );
}
