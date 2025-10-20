"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

interface CreateIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIssueCreated: () => void;
}

const CreateIssueModal: React.FC<CreateIssueModalProps> = ({
  isOpen,
  onClose,
  onIssueCreated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const projectId = Number(pathname.split("/").pop());

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    if (isOpen) setTimeout(() => titleInputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, title, description, priority, status, dueDate]);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !projectId) return;

    setLoading(true);
    try {
      await axiosInstance.post("/api/issues", {
        title,
        description,
        priority,
        status,
        dueDate,
        projectId,
        assigneeId: null,
      });

      toast.success("Issue created successfully!");
      onIssueCreated();
      onClose();

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setStatus("Pending");
      setDueDate("");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0b0b0b] p-8 rounded-2xl w-[600px] flex flex-col gap-5 shadow-2xl border border-gray-800"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white text-lg font-semibold">
                Create New Issue
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <input
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Issue title..."
              className="p-3 rounded-lg bg-[#141414] text-white border border-gray-700 outline-none focus:ring-2 focus:ring-indigo-600"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue..."
              rows={3}
              className="p-3 rounded-lg bg-[#141414] text-white border border-gray-700 outline-none focus:ring-2 focus:ring-indigo-600"
            />

            <div className="flex gap-4">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="flex-1 p-2 bg-[#141414] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-600"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex-1 p-2 bg-[#141414] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-600"
              >
                <option value="New">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="p-2 rounded-lg bg-[#141414] text-white border border-gray-700 outline-none focus:ring-2 focus:ring-indigo-600"
            />

            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !description.trim() || loading}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${title.trim() && description.trim()
                ? "bg-indigo-700 hover:bg-indigo-800 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
            >
              {loading ? "Creating..." : "Submit Issue"}
            </button>

            <p className="text-xs text-gray-500 text-right">
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
