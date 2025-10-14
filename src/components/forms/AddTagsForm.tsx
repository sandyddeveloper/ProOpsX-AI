"use client";

import React, { useEffect, useState } from "react";
import {Check, Tag as TagIcon, Plus, Trash, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Tag {
  id: number;
  name: string;
}

const AddTagsForm: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [popup, setPopup] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch all tags
  const fetchTags = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/tags", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
      const data = await res.json();
      setTags(data);
    } catch (err) {
      console.error(err);
      setPopup({ type: "error", msg: "Failed to fetch tags" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => setPopup(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  // ➕ Create tag
  const handleCreate = async () => {
    if (!newTag.trim()) return;
    try {
      const res = await fetch("http://localhost:8080/api/tags", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTag }),
      });
      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
      const createdTag = await res.json();
      setTags((prev) => [...prev, createdTag]);
      setNewTag("");
      setPopup({ type: "success", msg: "Tag created successfully!" });
    } catch (err) {
      console.error(err);
      setPopup({ type: "error", msg: "Failed to create tag" });
    }
  };

  // 🗑️ Delete tag
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/tags/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      // if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
      setTags((prev) => prev.filter((t) => t.id !== id));
      setPopup({ type: "success", msg: "Tag deleted successfully!" });
    } catch (err) {
      console.error(err);
      setPopup({ type: "error", msg: "Failed to delete tag" });
    }
  };

  // ✏️ Edit tag
  const handleEdit = async (id: number) => {
    if (!editingName.trim()) return;
    try {
      const res = await fetch(`http://localhost:8080/api/tags/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName }),
      });
      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
      const updatedTag = await res.json();
      setTags((prev) => prev.map((t) => (t.id === id ? updatedTag : t)));
      setEditingId(null);
      setEditingName("");
      setPopup({ type: "success", msg: "Tag updated successfully!" });
    } catch (err) {
      console.error(err);
      setPopup({ type: "error", msg: "Failed to update tag" });
    }
  };

  // 🧩 Split tags evenly
  const mid = Math.ceil(tags.length / 2);
  const columns = [tags.slice(0, mid), tags.slice(mid)];

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-5 py-6 sm:py-8 text-gray-900 dark:text-gray-100 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <TagIcon className="w-6 h-6 text-indigo-500" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Manage Tags</h1>
        </div>
      </div>

      {/* Create Tag */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Enter a new tag name..."
          className="flex-1 px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full"
        />
        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm sm:text-base transition w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" /> Add
        </button>
      </div>

      {/* Tag Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {columns.map((group, colIdx) => (
          <div
            key={colIdx}
            className="overflow-x-auto border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm w-full"
          >
            <table className="min-w-full text-sm sm:text-base">
              <thead className="bg-gray-100 dark:bg-black text-left text-gray-700 dark:text-gray-300 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-3 sm:px-4 py-3 w-12 sm:w-16">#</th>
                  <th className="px-3 sm:px-4 py-3">Tag Name</th>
                  <th className="px-3 sm:px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-4 py-3">
                        <div className="h-4 w-6 bg-gray-200 dark:bg-neutral-700 rounded"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-32 bg-gray-200 dark:bg-neutral-700 rounded"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-neutral-700 rounded mx-auto"></div>
                      </td>
                    </tr>
                  ))
                ) : group.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-500 dark:text-gray-400">
                      No tags
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {group.map((tag, idx) => {
                      const num = colIdx === 0 ? idx + 1 : mid + idx + 1;
                      return (
                        <motion.tr
                          key={tag.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="border-t border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
                        >
                          <td className="px-3 sm:px-4 py-3 font-medium text-center">{num}</td>
                          <td className="px-3 sm:px-4 py-3">
                            {editingId === tag.id ? (
                              <input
                                type="text"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="w-full px-2 py-1 text-sm sm:text-base border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            ) : (
                              <span className="break-words">{tag.name}</span>
                            )}
                          </td>
                          <td className="px-3 sm:px-4 py-3 text-center">
                            {editingId === tag.id ? (
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => handleEdit(tag.id)}
                                  className="p-1.5 sm:p-2 rounded text-green-600 hover:text-green-500 transition"
                                >
                                  <Check size={16} />
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="p-1.5 sm:p-2 rounded text-gray-500 hover:text-gray-400 transition"
                                >
                                  <Trash size={16} />
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => {
                                    setEditingId(tag.id);
                                    setEditingName(tag.name);
                                  }}
                                  className="p-1.5 sm:p-2 rounded text-indigo-600 hover:text-indigo-500 transition"
                                >
                                  <Pencil size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(tag.id)}
                                  className="p-1.5 sm:p-2 rounded text-red-600 hover:text-red-500 transition"
                                >
                                  <Trash size={16} />
                                </button>
                              </div>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* ✅ Popup Notification */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-white shadow-lg backdrop-blur-md text-sm sm:text-base ${
              popup.type === "success" ? "bg-green-600/90" : "bg-red-600/90"
            }`}
          >
            {popup.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddTagsForm;
