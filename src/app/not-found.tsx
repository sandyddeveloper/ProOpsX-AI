"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FolderX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center  text-center px-6 overflow-hidden">

            {/* Background drifting waves */}
            <motion.div
                animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-40 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25)_0%,transparent_70%)]"
            />

            <motion.div
                animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-40 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.25)_0%,transparent_70%)]"
            />

            {/* Animated Illustration */}
            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: [0, -10, 0], opacity: 1 }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="mb-6 relative z-10"
            >
                <FolderX className="w-20 h-20 text-blue-600 drop-shadow-md" />
            </motion.div>

            {/* Big 404 */}
            <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm"
            >
                404
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative z-10 mt-4 text-lg md:text-xl text-gray-600"
            >
                Oops! The page you’re looking for doesn’t exist.
            </motion.p>

            {/* Button back home */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative z-10"
            >
                <Link
                    href="/"
                    className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 
             text-white font-medium shadow-md transition-all duration-300
             hover:bg-blue-700 
             active:translate-y-0 active:shadow-md"
                >
                    Go back home
                </Link>

            </motion.div>
        </div>
    );
}
