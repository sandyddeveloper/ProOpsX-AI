"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  X,
  Edit,
  Check,
  Trash,
  Plus,
  Folder,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: number;
  name: string;
}

const CategoriesForm: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [popup, setPopup] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/api/categories");
      setCategories(res.data);
    } catch (err: any) {
      console.error(err);
      setPopup({ type: "error", msg: "Failed to fetch categories" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => setPopup(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  // Create category
  const handleCreate = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await axiosInstance.post("/api/categories", { name: newCategory });
      setCategories((prev) => [...prev, res.data]);
      setNewCategory("");
      setPopup({ type: "success", msg: "Category created successfully!" });
    } catch (err: any) {
      console.error(err);
      setPopup({ type: "error", msg: "Failed to create category" });
    }
  };

  // Delete category
  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/api/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setPopup({ type: "success", msg: "Category deleted successfully!" });
    } catch (err: any) {
      console.error(err);
      setPopup({ type: "error", msg: "Failed to delete category" });
    }
  };

  // Edit category
  const handleEdit = async (id: number) => {
    if (!editingName.trim()) return;
    try {
      const res = await axiosInstance.put(`/api/categories/${id}`, { name: editingName });
      setCategories((prev) => prev.map((c) => (c.id === id ? res.data : c)));
      setEditingId(null);
      setEditingName("");
      setPopup({ type: "success", msg: "Category updated successfully!" });
    } catch (err: any) {
      console.error(err);
      setPopup({ type: "error", msg: "Failed to update category" });
    }
  };

  // Split evenly for two tables
  const mid = Math.ceil(categories.length / 2);
  const columns = [categories.slice(0, mid), categories.slice(mid)];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Folder className="w-6 h-6 text-indigo-500" />
        <h1 className="text-3xl font-bold tracking-tight">Manage Categories</h1>
      </div>

      {/* Create Input */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
        >
          <Plus className="w-5 h-5" /> Add
        </button>
      </div>

      {/* Two-column layout for categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {columns.map((group, colIdx) => (
          <div
            key={colIdx}
            className="overflow-x-auto border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm"
          >
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-black text-left text-gray-700 dark:text-gray-300 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3 w-16">#</th>
                  <th className="px-4 py-3">Category Name</th>
                  <th className="px-4 py-3 w-32 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(4)].map((_, i) => (
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
                    <td
                      colSpan={3}
                      className="text-center py-6 text-gray-500 dark:text-gray-400"
                    >
                      No categories
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {group.map((cat, idx) => {
                      const sno = colIdx === 0 ? idx + 1 : mid + idx + 1;
                      return (
                        <motion.tr
                          key={cat.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="border-t border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
                        >
                          <td className="px-4 py-3 font-medium">{sno}</td>
                          <td className="px-4 py-3">
                            {editingId === cat.id ? (
                              <input
                                type="text"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            ) : (
                              <span>{cat.name}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {editingId === cat.id ? (
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => handleEdit(cat.id)}
                                  className="p-2 rounded text-green-600 hover:text-green-500 transition"
                                >
                                  <Check size={18} />
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="p-2 rounded text-gray-500 hover:text-gray-400 transition"
                                >
                                  <X size={18} />
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => {
                                    setEditingId(cat.id);
                                    setEditingName(cat.name);
                                  }}
                                  className="p-2 rounded text-indigo-600 hover:text-indigo-500 transition"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(cat.id)}
                                  className="p-2 rounded text-red-600 hover:text-red-500 transition"
                                >
                                  <Trash size={18} />
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

      {/* Popup Notification */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 rounded-lg text-white shadow-lg backdrop-blur-md ${popup.type === "success" ? "bg-green-600/90" : "bg-red-600/90"
              }`}
          >
            {popup.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoriesForm;
