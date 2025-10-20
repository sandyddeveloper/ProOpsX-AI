"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { SortableItem } from "./Issue/SortableItem";
import CreateIssueModal from "../forms/modal/CreateTaskModal";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Resolved";
  position: number;
}

const statusMeta = {
  Pending: { title: "To Do", color: "bg-red-50 text-red-700 ring-red-200" },
  "In Progress": {
    title: "In Progress",
    color: "bg-yellow-50 text-yellow-800 ring-yellow-200",
  },
  Resolved: {
    title: "Completed",
    color: "bg-green-50 text-green-700 ring-green-200",
  },
};

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const pathname = usePathname();
  const projectId = Number(pathname?.split("/").filter(Boolean).pop() ?? NaN);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  const columns: Task["status"][] = ["Pending", "In Progress", "Resolved"];

  const fetchTasks = async () => {
    if (!projectId) return;
    try {
      const res = await axiosInstance.get(`/api/issues/project/${projectId}`);
      const issues: Task[] = res.data.map((issue: any) => ({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        status: issue.status as Task["status"],
        position: issue.position ?? 0,
      }));
      setTasks(issues);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load issues");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = Number(active.id);
    const overId = Number(over.id);
    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);
    if (!activeTask || !overTask) return;

    let newTasks = [...tasks];

    if (activeTask.status === overTask.status) {
      const columnTasks = newTasks
        .filter((t) => t.status === activeTask.status)
        .sort((a, b) => a.position - b.position);
      const oldIndex = columnTasks.findIndex((t) => t.id === activeTask.id);
      const newIndex = columnTasks.findIndex((t) => t.id === overTask.id);
      const reordered = arrayMove(columnTasks, oldIndex, newIndex);
      reordered.forEach((task, idx) => {
        task.position = idx;
        const idxAll = newTasks.findIndex((t) => t.id === task.id);
        newTasks[idxAll] = task;
      });
    } else {
      // cross-column move
      newTasks = newTasks.filter((t) => t.id !== activeTask.id);
      const targetColumn = newTasks
        .filter((t) => t.status === overTask.status)
        .sort((a, b) => a.position - b.position);
      const movedTask = { ...activeTask, status: overTask.status };
      const insertIndex = targetColumn.findIndex((t) => t.id === overTask.id);
      targetColumn.splice(insertIndex, 0, movedTask);

      const updated = newTasks.map((t) => ({ ...t }));
      const targetIds = targetColumn.map((t) => t.id);
      targetColumn.forEach((task, idx) => {
        const idxAll = updated.findIndex((x) => x.id === task.id);
        if (idxAll !== -1) {
          updated[idxAll].position = idx;
          updated[idxAll].status = task.status;
        }
      });
      const sourceColumn = updated
        .filter((t) => t.status === activeTask.status)
        .sort((a, b) => a.position - b.position);
      sourceColumn.forEach((task, idx) => {
        const idxAll = updated.findIndex((x) => x.id === task.id);
        if (idxAll !== -1) updated[idxAll].position = idx;
      });

      newTasks = updated;

      // ✅ immediately update backend for status change
      try {
        await axiosInstance.put(
          `/api/issues/${activeTask.id}/status/${encodeURIComponent(overTask.status)}`
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to update status");
      }
    }

    const previousTasks = [...tasks];
    setTasks(newTasks);

    const payload = newTasks.map((t) => ({
      id: t.id,
      position: t.position,
      status: t.status,
    }));

    try {
      await axiosInstance.put("/api/issues/reorder", payload);
      toast.success("Order updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save order");
      setTasks(previousTasks); // rollback
    }
  };

  return (
    <div className="px-4 py-6">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-6">
          {columns.map((status) => {
            const columnTasks = tasks
              .filter((t) => t.status === status)
              .sort((a, b) => a.position - b.position);

            return (
              <div key={status} className="min-w-[280px] md:min-w-0">
                <div className={`rounded-xl p-4 ring-1 ring-inset ${statusMeta[status].color}`}>
                  <h2 className="text-sm font-semibold mb-3">{statusMeta[status].title}</h2>

                  <SortableContext
                    items={columnTasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {columnTasks.map((task) => (
                      <SortableItem
                        key={task.id}
                        task={task}
                        fetchTasks={fetchTasks}
                        projectId={projectId}
                      />
                    ))}
                  </SortableContext>

                  {/* Only show Create button for "In Progress" column */}
                  {status === "Pending" && (
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="mt-4 w-full px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm font-medium"
                    >
                      + Create Issue
                    </button>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </DndContext>

      <CreateIssueModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onIssueCreated={fetchTasks}
      />
    </div>
  );
};

export default TaskBoard;
