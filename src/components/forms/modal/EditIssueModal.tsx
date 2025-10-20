// src/components/issues/EditIssueModal.tsx
"use client";
import axiosInstance from "@/services/axiosConfig";
import { Task } from "@/types/types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";



interface Props {
  issue: Task | null;
  onClose: () => void;
  onUpdated: () => void;
}

const EditIssueModal: React.FC<Props> = ({ issue, onClose, onUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("New");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (issue) {
      setTitle(issue.title);
      setDescription(issue.description);
      setStatus(issue.status);
    }
  }, [issue]);

  if (!issue) return null;

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axiosInstance.put(`/api/issues/${issue.id}`, {
        title,
        description,
        status,
        priority: "MEDIUM",
        dueDate: null,
        projectId: null,
        assigneeId: null,
      });
      toast.success("Issue updated");
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Issue</h3>
          <button onClick={onClose}>Close</button>
        </div>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 mb-3 rounded bg-gray-100 dark:bg-gray-800" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} className="w-full p-2 mb-3 rounded bg-gray-100 dark:bg-gray-800" />

        <div className="flex gap-2 mb-3">
          <select value={status} onChange={(e) => setStatus(e.target.value as Task["status"])} className="p-2 rounded bg-gray-100 dark:bg-gray-800">
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 rounded bg-gray-200">Cancel</button>
          <button onClick={handleUpdate} disabled={loading} className="px-4 py-2 rounded bg-indigo-600 text-white">{loading ? "Updating..." : "Update"}</button>
        </div>
      </div>
    </div>
  );
};

export default EditIssueModal;
