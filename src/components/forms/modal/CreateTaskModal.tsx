"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CreateIssueModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    onSubmit: () => void;
}

const CreateIssueModal: React.FC<CreateIssueModalProps> = ({
    isOpen,
    onClose,
    title,
    setTitle,
    description,
    setDescription,
    onSubmit,
}) => {
    const titleInputRef = useRef<HTMLInputElement>(null);

    // Focus the title field when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => titleInputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Handle keyboard shortcuts (Enter = submit, Esc = close)
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "Enter" && e.ctrlKey) {
                // Ctrl+Enter or Cmd+Enter for submit
                e.preventDefault();
                if (title.trim() && description.trim()) onSubmit();
            }
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, title, description, onClose, onSubmit]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-black p-12 rounded-xl w-[600px] flex flex-col gap-4 shadow-2xl relative"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <h3 className="text-white text-lg font-semibold">
                                Create New Issue
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Input Fields */}
                        <input
                            ref={titleInputRef}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Project Issue..."
                            className="p-2 rounded bg-[#0f172a] text-white border border-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
                        />

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Issue Description..."
                            rows={1}
                            className="p-2 rounded bg-[#0f172a] text-white border border-gray-700 outline-none resize-none focus:ring-2 focus:ring-blue-600"
                        />

                        {/* Submit Button */}
                        <button
                            onClick={onSubmit}
                            disabled={!title.trim() || !description.trim()}
                            className={`px-4 py-2 rounded font-medium ${
                                title.trim() && description.trim()
                                    ? "bg-purple-800 hover:bg-purple-950 text-white"
                                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Submit Issue
                        </button>

                        {/* Shortcuts Hint */}
                        <p className="text-xs text-gray-400 text-right">
                            Press <kbd className="px-1 bg-gray-700 rounded">Ctrl</kbd>+
                            <kbd className="px-1 bg-gray-700 rounded">Enter</kbd> to submit
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CreateIssueModal;
