"use client";
import React, { useEffect, useState } from "react";
import { Users, User, Tag, Layers, Github } from "lucide-react";
import InviteModal from "../forms/modal/InviteModal";
import TaskBoard from "./TaskBoard";

interface TeamMember {
  id: number;
  username: string;
  email?: string;
}

interface ProjectDetailsProps {
  id: number;
  title: string;
  description: string;
  githubLink?: string;
  owner: {
    id: number;
    username: string;
    email?: string;
  };
  category?: {
    id: number;
    name: string;
  };
  tags?: { id: number; name: string }[];
  team?: TeamMember[];
  status?: "In Progress" | "Completed" | "Pending" | "On Hold";
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  title,
  description,
  githubLink,
  owner,
  category,
  tags = [],
  team = [],
  status = "In Progress",
}) => {
  const statusStyles: Record<string, string> = {
    "In Progress":
      "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-600/40",
    Completed:
      "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-300 dark:border-green-600/40",
    Pending:
      "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600/40",
    "On Hold":
      "bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600/40",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleInvite = (values: string[]) => console.log("Invited members:", values);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "i") setIsModalOpen(true);
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <>
      <div className="px-4 sm:px-8 text-gray-900 dark:text-gray-200">
        {/* Project Header */}
        <div className="space-y-2 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Project Info */}
        <div className="mt-6 space-y-5">
          {/* Project Lead */}
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Project Lead:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {owner?.username || "Unknown"}
            </span>
          </div>

          {/* Members */}
          <div className="flex items-center gap-3 flex-wrap">
            <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Team:</span>
            <div className="flex items-center gap-2">
              {team.length > 0 ? (
                team.map((m) => (
                  <div
                    key={m.id}
                    title={m.username}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {m.username.charAt(0).toUpperCase()}
                  </div>
                ))
              ) : (
                <span className="text-gray-500 text-sm">No members yet</span>
              )}

              {/* Invite Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-sm flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Invite <span className="font-bold">+</span>
              </button>
            </div>
            <InviteModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              suggestions={["Alice", "Bob", "Charlie", "David"]}
              onInvite={handleInvite}
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Category:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {category?.name || "No category"}
            </span>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Tags:</span>
            {tags.length > 0 ? (
              tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tag.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No tags</span>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
            >
              {status}
            </span>
          </div>

          {/* GitHub */}
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">GitHub:</span>
            {githubLink ? (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-900 dark:text-white hover:underline"
              >
                {githubLink.split("/").slice(-2).join("/")}
              </a>
            ) : (
              <span className="font-medium text-gray-500 dark:text-gray-400">
                Not provided
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Task Board */}
      <TaskBoard />
    </>
  );
};

export default ProjectDetails;
