"use client"
import React, { useEffect, useState } from "react";
import { Users, User, Tag, Layers } from "lucide-react";
import InviteModal from "../forms/modal/InviteModal";
import TaskBoard from "./TaskBoard";

interface Member {
  id: number;
  name: string;
  initials: string;
}

interface ProjectDetailsProps {
  title: string;
  description: string;
  lead: string;
  members: Member[];
  category: string;
  status: "In Progress" | "Completed" | "Pending" | "On Hold";
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  title,
  description,
  lead,
  members,
  category,
  status,
}) => {
  // Status color mapping
  const statusStyles: Record<string, string> = {
    "In Progress": "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40",
    Completed: "bg-green-500/20 text-green-400 border border-green-500/40",
    Pending: "bg-red-500/20 text-red-400 border border-red-500/40",
    "On Hold": "bg-gray-500/20 text-gray-400 border border-gray-500/40",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleInvite = (values: string[]) => {
    console.log("Invited members:", values);
  };



  // Shortcut: Ctrl + I
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "i") {
        setIsModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);
  return (
    <>
      <div className="text-gray-200 px-4 sm:px-8">
        {/* Project Header */}
        <div className="space-y-2 border-b border-gray-700 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-green-400" />
            <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-400">{description}</p>
        </div>

        {/* Project Info */}
        <div className="mt-6 space-y-5">
          {/* Project Lead */}
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400">Project Lead:</span>
            <span className="font-medium text-white">{lead}</span>
          </div>

          {/* Members */}
          <div className="flex items-center gap-3 flex-wrap">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400">Members:</span>
            <div className="flex items-center gap-2">
              {(members ?? []).map((m) => (
                <div
                  key={m.id}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 border border-gray-600 text-sm font-medium text-white"
                >
                  {m.initials}
                </div>
              ))}

              {/* Invite Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1 rounded-md border border-gray-600 text-sm flex items-center gap-1 hover:bg-gray-800 transition"
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
            <Tag className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400">Category:</span>
            <span className="font-medium text-white">{category}</span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
      <TaskBoard />
    </>
  );
};

export default ProjectDetails;
