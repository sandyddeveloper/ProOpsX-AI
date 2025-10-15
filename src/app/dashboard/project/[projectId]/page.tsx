"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { useParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";

// The structure expected by ProjectDetails
interface TeamMember {
  id: number;
  username: string;
  email?: string;
}

interface ProjectDetailsProps {
  id: number;
  title: string;
  description: string;
  githubLink: string;
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

const ProjectPage = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState<ProjectDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        console.log("🚀 Fetching from backend:", `http://localhost:8080/api/projects/${projectId}`);

        const response = await axios.get(`http://localhost:8080/api/projects/${projectId}`, {
          withCredentials: true,
        });

        const data = response.data;
        console.log("✅ Project API response:", data);

        const formattedProject: ProjectDetailsProps = {
          id: data.id || 0,
          title: data.title || "Untitled Project",
          description: data.description || "No description provided.",
          owner: {
            id: data.owner?.id || 0,
            username: data.owner?.username || "Unknown",
            email: data.owner?.email || "",
          },
          team: (data.team || []).map((m: any) => ({
            id: m.id,
            username: m.username || "Unnamed",
            email: m.email || "",
          })),
          category: data.category
            ? { id: data.category.id, name: data.category.name }
            : { id: 0, name: "Uncategorized" },
          tags: Array.isArray(data.tags)
            ? data.tags.map((t: any) => ({ id: t.id, name: t.name }))
            : [],
          githubLink: data.githubLink || "",
          status: "In Progress",
        };


        setProject(formattedProject);
      } catch (err: any) {
        console.error("❌ Fetch error:", err);
        setError("Failed to fetch project details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-600 dark:text-gray-300">
        <Loader2 className="animate-spin mr-2" />
        Loading project details...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-red-500">
        <AlertCircle size={36} className="mb-2" />
        <p>{error || "Project not found."}</p>
      </div>
    );
  }

  return <ProjectDetails {...project} />;
};

export default ProjectPage;
