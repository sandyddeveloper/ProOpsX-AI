"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SearchableModal } from "../ui/PopupModal";

interface Popup {
  type: "success" | "error";
  msg: string;
}

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

const AddProjectForm: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [githubLink, setGithubLink] = useState("");
  const [popup, setPopup] = useState<Popup | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch categories & tags from backend
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/categories", {
        withCredentials: true,
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tags", {
        withCredentials: true,
      });
      setTags(res.data);
    } catch (err) {
      console.error("Failed to fetch tags", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  // Popup auto-hide
  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => setPopup(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName || !description || !selectedCategory || selectedTags.length === 0 || !githubLink) {
      setPopup({ type: "error", msg: "Please fill all fields correctly!" });
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8080/api/projects",
        {
          title: projectName,
          description,
          category: { id: selectedCategory.id },
          tags: selectedTags.map((t) => ({ id: t.id })),
          githubLink: githubLink,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );



      setPopup({ type: "success", msg: "Project created successfully!" });
      setProjectName("");
      setDescription("");
      setSelectedCategory(null);
      setSelectedTags([]);
      setGithubLink("");
    } catch (err: any) {
      setPopup({
        type: "error",
        msg: err?.response?.data?.message || "Failed to create project!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Add New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          placeholder="Project Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Category selector */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <button
            type="button"
            onClick={() => setIsCategoryOpen(true)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-left hover:ring-1 hover:ring-indigo-500 transition"
          >
            {selectedCategory ? selectedCategory.name : "Select a category"}
          </button>
        </div>

        {/* Tags selector */}
        <div>
          <label className="block text-sm font-medium mb-2">Tech Stack</label>
          <button
            type="button"
            onClick={() => setIsTagsOpen(true)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-left hover:ring-1 hover:ring-indigo-500 transition"
          >
            {selectedTags.length > 0 ? "Edit selected technologies" : "Select technologies"}
          </button>

          {/* Selected Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedTags.map((tag) => (
              <span key={tag.id} className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                {tag.name}
                <button
                  type="button"
                  onClick={() => setSelectedTags(selectedTags.filter((t) => t.id !== tag.id))}
                  className="ml-1"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <input
          type="url"
          placeholder="GitHub Repository Link"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 rounded-lg bg-black hover:bg-gray-800 text-white font-semibold shadow-lg transition"
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>

      {/* Popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white ${popup.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
          >
            {popup.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Modal */}
      <SearchableModal
        isOpen={isCategoryOpen}
        onClose={() => setIsCategoryOpen(false)}
        title="Select Category"
        items={categories.map((c) => c.name)}
        onSelect={(name) => {
          const cat = categories.find((c) => c.name === name);
          if (cat) setSelectedCategory(cat);
        }}
      />

      {/* Tags Modal */}
      <SearchableModal
        isOpen={isTagsOpen}
        onClose={() => setIsTagsOpen(false)}
        title="Select Tech Stack"
        items={tags.map((t) => t.name)}
        multiSelect
        selectedItems={selectedTags.map((t) => t.name)}
        onSelect={(selected: string[] | string) => {
          if (Array.isArray(selected)) {
            const selectedTagObjs = tags.filter((t) => selected.includes(t.name));
            setSelectedTags(selectedTagObjs);
          }
        }}
      />
    </div>
  );
};

export default AddProjectForm;
