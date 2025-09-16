"use client"
import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"
import { SearchableModal } from "../ui/PopupModal"

const AddProjectForm = () => {
  const categories = ["Frontend", "Backend", "Mobile", "Fullstack"]
  const techStack = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "TailwindCSS",
    "Django",
    "Spring Boot",
    "SQL",
    "Node.js",
    "Python",
    "Java",
  ]

  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isTagsOpen, setIsTagsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [githubLink, setGithubLink] = useState("")
  const [popup, setPopup] = useState<{ type: "success" | "error"; msg: string } | null>(null)


  useEffect(() => {
  if (popup) {
    const timer = setTimeout(() => {
      setPopup(null)
    }, 5000) // 5 seconds

    return () => clearTimeout(timer)
  }
}, [popup])

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectName || !description || !selectedCategory || selectedTags.length === 0 || !githubLink) {
      setPopup({ type: "error", msg: "Please fill all fields correctly!" })
      return
    }
    setPopup({ type: "success", msg: "Project created successfully!" })
    setProjectName("")
    setDescription("")
    setSelectedCategory("")
    setSelectedTags([])
    setGithubLink("")
  }

  return (
    <div className="text-gray-900 dark:text-gray-100 flex flex-col items-center overflow-y-hidden">

      <div className="w-full max-w-2xl ">
        <h1 className="text-2xl font-bold mb-3">Add Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Description */}
          <textarea
            placeholder="Project Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <button
              type="button"
              onClick={() => setIsCategoryOpen(true)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-left"
            >
              {selectedCategory || "Select a category"}
            </button>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tech Stack</label>
            <button
              type="button"
              onClick={() => setIsTagsOpen(true)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-left"
            >
              {selectedTags.length > 0
                ? "Edit selected technologies"
                : "Select technologies"}
            </button>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* GitHub Link */}
          <input
            type="url"
            placeholder="GitHub Repository Link"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg bg-black  hover:bg-gray-700 text-white font-semibold shadow-lg"
          >
            Create Project
          </button>
        </form>
      </div>

      {/* Success/Error Popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed bottom-6 px-6 py-3 rounded-lg shadow-lg text-white ${
              popup.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {popup.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <SearchableModal
        isOpen={isCategoryOpen}
        onClose={() => setIsCategoryOpen(false)}
        title="Select Category"
        items={categories}
        onSelect={(item) => setSelectedCategory(item as string)}
      />

      <SearchableModal
        isOpen={isTagsOpen}
        onClose={() => setIsTagsOpen(false)}
        title="Select Tech Stack"
        items={techStack}
        multiSelect
        selectedItems={selectedTags}
        onSelect={(items) => setSelectedTags(items as string[])}
      />
    </div>
  )
}

export default AddProjectForm
