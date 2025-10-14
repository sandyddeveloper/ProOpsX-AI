"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import EditProjectModal from "@/components/projects/EditProjectModal";
import DeleteConfirmModal from "@/components/projects/DeleteConfirmModal";


interface Category {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    githubLink?: string;
    category?: Category;
    tags?: Tag[];
}

const ProjectManagementPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchProjects = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/projects", {
                withCredentials: true,
            });
            setProjects(res.data);
        } catch (err) {
            console.error("Failed to fetch projects", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setShowEditModal(true);
    };

    const handleDelete = (project: Project) => {
        setSelectedProject(project);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedProject) return;
        try {
            await axios.delete(`http://localhost:8080/api/projects/${selectedProject.id}`, {
                withCredentials: true,
            });
            setProjects((prev) => prev.filter((p) => p.id !== selectedProject.id));
        } catch (err) {
            console.error("Delete failed", err);
        } finally {
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="w-full min-h-screen  p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Project Management
                </h1>
                <Button
                    onClick={() => (window.location.href = "/dashboard/project/add")}
                    className="!bg-black hover:!bg-gray-800 !text-white flex items-center gap-2 !capitalize"
                >
                    <FaPlus /> Add Project
                </Button>
            </div>

            {loading ? (
                <p className="text-gray-500 text-center mt-10">Loading projects...</p>
            ) : projects.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">No projects found.</p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-lg font-semibold mb-2 dark:text-white text-black">{project.title}</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    {project.description}
                                </p>
                                {project.category && (
                                    <p className="text-xs text-indigo-600 mb-2">
                                        Category: {project.category.name}
                                    </p>
                                )}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.tags?.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="px-2 py-1 text-xs bg-indigo-500 text-white rounded-full"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                                {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline text-sm"
                                    >
                                        View GitHub
                                    </a>
                                )}
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
                                >
                                    <FaEdit size={14} />
                                </button>
                                <button
                                    onClick={() => handleDelete(project)}
                                    className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <FaTrash size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showEditModal && selectedProject && (
                <EditProjectModal
                    project={selectedProject}
                    onClose={() => setShowEditModal(false)}
                    onUpdated={fetchProjects}
                />
            )}

            {showDeleteModal && selectedProject && (
                <DeleteConfirmModal
                    projectTitle={selectedProject.title}
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteConfirm}
                />
            )}
        </div>
    );
};

export default ProjectManagementPage;
