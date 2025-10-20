"use client";
import React, { useRef, useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  MoreHorizontal,
  CheckCircle,
  Loader2,
  Pencil,
  Trash2,
  Clock,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import ViewButton from "@/components/ui/ViewButton";
import { Task } from "@/types/types";

interface Props {
  task: Task;
  fetchTasks: () => void;
  projectId: number;

}

export const SortableItem: React.FC<Props> = ({ task, fetchTasks, projectId }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = { transform: CSS.Transform.toString(transform), transition };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  // 🧠 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // 🧠 Toggle dropdown
  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  // 🗑️ Delete issue
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/issues/${task.id}`, {
        withCredentials: true, // ensures cookies are sent
        headers: { "Content-Type": "application/json" }, // optional but safe
      });

      toast.success("Issue deleted");
      fetchTasks(); // refresh task list
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete");
    } finally {
      setDropdownOpen(false);
    }
  };


  // 🔁 Cycle through statuses
  const handleStatusToggle = async () => {
    const current = task.status.toLowerCase();
    const nextStatus =
      current === "pending"
        ? "In Progress"
        : current === "in progress"
          ? "Resolved"
          : "Pending";

    try {
      await axiosInstance.put(`/api/issues/${task.id}/status/${encodeURIComponent(nextStatus)}`)
      toast.success(`Marked as ${nextStatus}`);
      fetchTasks();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setDropdownOpen(false);
    }
  };

  // 💾 Save edit
  const handleSaveEdit = async () => {
    if (!editTitle.trim() || !editDesc.trim()) {
      toast.error("Title and description required");
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.put(`/api/issues/${task.id}`, {
        title: editTitle,
        description: editDesc,
        priority: "MEDIUM",
        status: task.status,
      });
      toast.success("Issue updated");
      fetchTasks();
      setEditOpen(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // 🧮 Compute progress percent
  const progressPercent =
    task.status === "Pending" ? 0 : task.status === "In Progress" ? 50 : 100;

  return (
    <>
      {/* TASK CARD */}
      <motion.article
        ref={setNodeRef}
        style={style}
        {...attributes}
        layout
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition mb-3 cursor-grab"
      >
        <div className="flex items-start justify-between gap-3">
          {/* LEFT CONTENT */}
          <div className="flex-1">
            <div {...listeners} className="cursor-grab active:cursor-grabbing">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {task.title}
              </h3>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
                {task.description}
              </p>
              <span
                className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-full
                  ${task.status === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : task.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
              >
                {task.status.toUpperCase()}
              </span>

              {/* Progress bar */}
              <div className="mt-2 w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-1.5 ${task.status === "Resolved"
                    ? "bg-green-500"
                    : task.status === "In Progress"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                    }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex flex-col items-end gap-2 relative" ref={dropdownRef}>
            <div
              className={`w-7 h-7 flex items-center justify-center rounded-full 
                ${task.status === "Resolved"
                  ? "bg-green-100 text-green-700"
                  : task.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                }`}
            >
              {task.status === "Resolved" ? (
                <CheckCircle size={14} />
              ) : task.status === "In Progress" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Clock size={14} />
              )}
            </div>

            <button
              onClick={handleToggleDropdown}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <MoreHorizontal size={18} />
            </button>

            {/* DROPDOWN MENU */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-[9999]"
                >
                  <ViewButton projectId={projectId} taskId={task.id} />

                  <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => {
                      setEditOpen(true);
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Pencil size={14} /> Edit
                  </button>

                  <button
                    onClick={handleStatusToggle}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Loader2 size={14} />
                    {task.status === "Pending"
                      ? "Mark In Progress"
                      : task.status === "In Progress"
                        ? "Mark Resolved"
                        : "Mark Pending"}
                  </button>

                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.article>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-[10000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[#0b0b0b] text-white rounded-2xl p-6 w-[450px] border border-gray-700"
            >
              <h3 className="text-lg font-semibold mb-4">Edit Issue</h3>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 mb-3"
                placeholder="Title"
              />
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                rows={4}
                className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 mb-3"
                placeholder="Description"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditOpen(false)}
                  className="px-3 py-2 text-sm bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={loading}
                  className="px-3 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
