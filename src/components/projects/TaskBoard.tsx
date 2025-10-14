"use client";
import React, { useEffect, useRef, useState } from "react";
import CreateIssueModal from "../forms/modal/CreateTaskModal";
import { User } from "lucide-react";


interface Task {
    id: number;
    title: string;
    tag: string;
    status: "todo" | "inprogress" | "completed";
}

const TaskBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: "Create Navbar", tag: "FBP - 1", status: "todo" },
        { id: 2, title: "Fix Bugs", tag: "FBP - 2", status: "inprogress" },
        { id: 3, title: "Deploy App", tag: "FBP - 3", status: "completed" },
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    const [issueTitle, setIssueTitle] = useState("");
    const [issueDesc, setIssueDesc] = useState("");

    const handleCreateIssue = () => {
        console.log("Creating Issue:", issueTitle, issueDesc);
        setShowCreateModal(false);
        setIssueTitle("");
        setIssueDesc("");
    };

    const menuRefs = useRef<Map<number, HTMLDivElement>>(new Map());

    const moveTask = (id: number, newStatus: Task["status"]) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
        );
        setOpenMenuId(null);
    };

    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        setOpenMenuId(null);
    };

    const addTask = () => {
        if (!newTaskTitle.trim()) return;
        const newTask: Task = {
            id: Date.now(),
            title: newTaskTitle,
            tag: `FBP - ${tasks.length + 1}`,
            status: "todo",
        };
        setTasks((prev) => [...prev, newTask]);
        setNewTaskTitle("");
        setShowCreateModal(false);
    };

    const onDragStart = (e: React.DragEvent, id: number) => {
        e.dataTransfer.setData("taskId", id.toString());
    };

    const onDrop = (e: React.DragEvent, newStatus: Task["status"]) => {
        const id = parseInt(e.dataTransfer.getData("taskId"), 10);
        moveTask(id, newStatus);
    };

    const allowDrop = (e: React.DragEvent) => e.preventDefault();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (openMenuId !== null) {
                const currentMenu = menuRefs.current.get(openMenuId);
                if (currentMenu && !currentMenu.contains(event.target as Node)) {
                    setOpenMenuId(null);
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openMenuId]);

    const renderTaskCard = (task: Task) => (
        <div
            key={task.id}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-md flex flex-col gap-2 hover:scale-[1.02] transition-transform cursor-grab"
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-gray-900 dark:text-white font-semibold">
                    {task.title}
                </h3>

                {/* Menu Button + Dropdown */}
                <div
                    className="relative"
                    ref={(el) => {
                        if (el) menuRefs.current.set(task.id, el);
                        else menuRefs.current.delete(task.id);
                    }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === task.id ? null : task.id);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                        ⋮
                    </button>

                    {openMenuId === task.id && (
                        <div className="absolute right-0 mt-2 w-32 flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 text-sm z-10 border border-gray-200 dark:border-gray-700">
                            {task.status !== "todo" && (
                                <button
                                    onClick={() => moveTask(task.id, "todo")}
                                    className="text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                >
                                    To Do
                                </button>
                            )}
                            {task.status !== "inprogress" && (
                                <button
                                    onClick={() => moveTask(task.id, "inprogress")}
                                    className="text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                >
                                    In Progress
                                </button>
                            )}
                            {task.status !== "completed" && (
                                <button
                                    onClick={() => moveTask(task.id, "completed")}
                                    className="text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                >
                                    Done
                                </button>
                            )}
                            <button className="text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                Edit
                            </button>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="text-left px-2 py-1 hover:bg-red-100 dark:hover:bg-red-700 rounded text-red-600 dark:text-red-400"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <span className="text-gray-600 dark:text-gray-400 text-sm">{task.tag}</span>

            <div className="flex justify-end">
                <div className="w-7 h-7 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-full text-gray-900 dark:text-white">
                    <User />
                </div>
            </div>
        </div>
    );

    const columns = [
        { key: "todo", title: "To Do" },
        { key: "inprogress", title: "In Progress" },
        { key: "completed", title: "Completed" },
    ];

    return (
        <div className="px-6 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((col) => (
                <div
                    key={col.key}
                    className="flex flex-col gap-4 p-2 rounded-xl"
                    onDragOver={allowDrop}
                    onDrop={(e) => onDrop(e, col.key as Task["status"])}
                >
                    <h2
                        className={`text-lg font-semibold ${col.key === "completed"
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-900 dark:text-white"
                            }`}
                    >
                        {col.title}
                    </h2>

                    <div className="flex flex-col gap-4 flex-1">
                        {tasks.filter((t) => t.status === col.key).map(renderTaskCard)}
                    </div>

                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="mt-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                        + Create Issue
                    </button>
                </div>
            ))}

            <CreateIssueModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title={issueTitle}
                setTitle={setIssueTitle}
                description={issueDesc}
                setDescription={setIssueDesc}
                onSubmit={handleCreateIssue}
            />
        </div>
    );
};

export default TaskBoard;
