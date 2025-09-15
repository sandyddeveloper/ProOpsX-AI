"use client";
import React from "react";
import Image from "next/image";
import { Hero } from "@/sections/Hero";

export default function AuthLayout({
    children,
    imageSrc = "/auth-bg.jpg", // default image
}: {
    children: React.ReactNode;
    imageSrc?: string;
}) {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:block relative h-screen overflow-hidden ">
                <Hero />
            </div>


            <div className="flex items-center justify-center ">
                <div className="w-full max-w-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
