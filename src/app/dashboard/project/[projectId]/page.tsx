"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { useParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";

interface Member {
  id: number;
  name: string;
  initials: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  lead: string;
  members: Member[];
  category: string;
  status: "In Progress" | "Completed" | "Pending";
  github: string;
}

const ProjectPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`http://localhost:8080/api/projects/552`, {
          withCredentials: true,
        });

        // 🩵 Log structure once
        console.log("✅ Project API response:", response.data);

        // Some APIs wrap actual object inside `data`
        const projectData =
          response.data?.data && typeof response.data.data === "object"
            ? response.data.data
            : response.data;

        if (!projectData || !projectData.id) {
          throw new Error("Invalid project data structure");
        }

        setProject(projectData);
      } catch (err: any) {
        console.error("❌ Error fetching project:", err);
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch project details.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

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
