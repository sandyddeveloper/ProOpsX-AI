"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Grid,
  List,
  SlidersHorizontal,
  X,
  FolderOpen,
  Filter,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

const sampleProjects: Project[] = [
  {
    id: 1,
    title: "Bug Tracker",
    description:
      "A complete bug tracking system with roles, assignments, and insights.",
    tags: ["Django", "React"],
    date: "2025-09-12",
  },
  {
    id: 2,
    title: "E-Commerce App",
    description:
      "Full-stack e-commerce solution with product management, cart, and payments.",
    tags: ["Next.js", "MySQL"],
    date: "2025-08-28",
  },
  {
    id: 3,
    title: "Gallery System",
    description:
      "Photo gallery with authentication, admin upload control, and viewing tools.",
    tags: ["Django", "Tailwind"],
    date: "2025-07-14",
  },
];

export default function ProjectsBox() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const allTags = Array.from(new Set(sampleProjects.flatMap((p) => p.tags)));

  const clearFilters = () => {
    setSearch("");
    setTagFilter("");
    setStartDate("");
    setEndDate("");
    setSortOrder("newest");
  };

  const filteredProjects = sampleProjects
    .filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesTag = !tagFilter || p.tags.includes(tagFilter);
      const projectDate = new Date(p.date);
      const matchesDate =
        (!startDate || projectDate >= new Date(startDate)) &&
        (!endDate || projectDate <= new Date(endDate));
      return matchesSearch && matchesTag && matchesDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  // Reusable styled select
  const CustomSelect = ({
    value,
    onChange,
    options,
  }: {
    value: string;
    onChange: (val: string) => void;
    options: { value: string; label: string }[];
  }) => (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full border rounded-lg px-3 py-2 pr-8 text-black bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        ▼
      </span>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto relative">
      {/* Toggle Button */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg border ${view === "grid" ? "bg-gray-200" : "bg-white"
              }`}
          >
            <Grid className="h-4 w-4 text-black" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg border ${view === "list" ? "bg-gray-200" : "bg-white"
              }`}
          >
            <List className="h-4 w-4 text-black" />
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-black border-r shadow-lg z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2 text-black dark:text-white">
            <SlidersHorizontal className="h-4 w-4 text-black dark:text-white" /> Filters
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-full hover:bg-gray-200 "
          >
            <X className="h-5 w-5 text-black dark:text-white hover:text-black" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-60px)]">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full text-black"
          />

          <CustomSelect
            value={tagFilter}
            onChange={setTagFilter}
            options={[
              { value: "", label: "All Tags" },
              ...allTags.map((tag) => ({ value: tag, label: tag })),
            ]}
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full text-black"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full text-black"
          />

          <CustomSelect
            value={sortOrder}
            onChange={setSortOrder}
            options={[
              { value: "newest", label: "Newest First" },
              { value: "oldest", label: "Oldest First" },
            ]}
          />

          <button
            onClick={clearFilters}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Projects */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
          <FolderOpen className="h-16 w-16 mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold">No Projects Found</h3>
          <p className="text-sm">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border shadow-md hover:shadow-lg transition p-4"
            >
              <Link href={`/dashboard/project/${project.id}`}>
                <h3 className="text-lg font-bold mb-2 text-black dark:text-white  hover:underline">
                  {project.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">{project.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
