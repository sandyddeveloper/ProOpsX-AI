"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import {
    Trash2,
    User,
    Tag,
    Calendar,
    UserCheck,
    CheckCircle2,
    Clock,
    MessageSquare,
    Edit3,
} from "lucide-react";

// Types
interface Comment {
    id: number;
    author: string;
    text: string;
}

interface IssueDetails {
    title: string;
    description: string;
    assignee: string;
    labels: string[];
    status: string;
    releaseDate: string;
    reporter: string;
}

interface HistoryEvent {
    id: number;
    type: "created" | "updated" | "status" | "comment" | "deleted";
    message: string;
    date: string;
}

interface IssueDetailsPageProps {
    initialComments?: Comment[];
    issue: IssueDetails;
    history?: HistoryEvent[];
}

// 🔹 Comment Item
const CommentItem: React.FC<{ comment: Comment; onDelete: (id: number) => void }> = ({
    comment,
    onDelete,
}) => (
    <motion.div
        key={comment.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex items-start gap-3 p-3 rounded-xl"
    >
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-black font-bold rounded-full w-9 h-9 flex items-center justify-center">
            {comment.author.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
            <p className="font-semibold text-white">{comment.author}</p>
            <p className="text-gray-300 break-words">{comment.text}</p>
        </div>
        <button
            onClick={() => onDelete(comment.id)}
            className="text-gray-400 hover:text-red-500 transition"
        >
            <Trash2 size={16} />
        </button>
    </motion.div>
);

// 🔹 Comment Input (mobile fix)
const CommentInput: React.FC<{
    newComment: string;
    setNewComment: (text: string) => void;
    addComment: () => void;
}> = ({ newComment, setNewComment, addComment }) => (
    <div className="flex flex-col sm:flex-row gap-2 bg-gray-800/40 p-3 rounded-xl w-full max-w-full">
        {/* Avatar + Input */}
        <div className="flex items-center gap-2 w-full">
            <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-full w-10 h-10 flex items-center justify-center text-black font-bold shadow text-sm">
                Y
            </div>
            <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base w-full"
            />
        </div>

        {/* Send Button */}
        <button
            onClick={addComment}
            className="mt-2 sm:mt-0 sm:ml-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg shadow hover:opacity-90 transition w-full sm:w-auto text-sm sm:text-base"
        >
            Send
        </button>
    </div>
);



// 🔹 Sidebar
const IssueSidebar: React.FC<{
    status: string;
    setStatus: (status: string) => void;
    issue: IssueDetails;
}> = ({ status, setStatus, issue }) => (
    <div className="w-full lg:w-1/3 rounded-2xl border border-gray-700 p-6 space-y-6 shadow-xl mt-4 lg:mt-0">
        <div className="relative w-full">
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="appearance-none w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-200 hover:border-yellow-400"
            >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
            </select>

            {/* Custom arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>


        <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2 text-gray-200">
                Issue Details
            </h3>

            <div className="space-y-3 text-sm">
                <DetailRow icon={<UserCheck size={16} />} label="Assignee" value={issue.assignee} />
                <DetailRow icon={<Tag size={16} />} label="Labels" value={issue.labels.join(", ") || "None"} />
                <DetailRow icon={<Calendar size={16} />} label="Release Date" value={issue.releaseDate} />
                <DetailRow icon={<User size={16} />} label="Reporter" value={issue.reporter} />
                <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                        <Tag size={16} /> Status
                    </span>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${status === "Done"
                            ? "bg-green-500/20 text-green-400"
                            : status === "In Progress"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                    >
                        {status}
                    </span>
                </div>
            </div>
        </div>
    </div>
);

const DetailRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({
    icon,
    label,
    value,
}) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-400 flex items-center gap-2">
            {icon} {label}
        </span>
        <span className="text-gray-200 truncate max-w-[60%] text-right">{value}</span>
    </div>
);
const sampleHistory: HistoryEvent[] = [
  {
    id: 1,
    type: "created",
    message: "Issue was created by Alice",
    date: "2025-09-20 10:15 AM",
  },
  {
    id: 2,
    type: "status",
    message: "Status changed from 'To Do' to 'In Progress'",
    date: "2025-09-21 09:30 AM",
  },
  {
    id: 3,
    type: "comment",
    message: "Bob commented: 'Need clarification on requirements.'",
    date: "2025-09-21 11:45 AM",
  },
  {
    id: 4,
    type: "updated",
    message: "Description updated to include more details",
    date: "2025-09-22 02:20 PM",
  },
  {
    id: 5,
    type: "deleted",
    message: "Removed outdated attachment",
    date: "2025-09-23 04:10 PM",
  },
  {
    id: 6,
    type: "comment",
    message: "Alice replied: 'All set, ready for review.'",
    date: "2025-09-23 05:00 PM",
  },
  {
    id: 7,
    type: "status",
    message: "Status changed from 'In Progress' to 'Done'",
    date: "2025-09-24 09:15 AM",
  },
];


// 🔹 History Timeline
const HistoryTimeline: React.FC<{ history: HistoryEvent[] }> = ({ history }) => {
    const iconMap: Record<HistoryEvent["type"], JSX.Element> = {
        created: <CheckCircle2 size={18} className="text-green-400" />,
        updated: <Edit3 size={18} className="text-blue-400" />,
        status: <Clock size={18} className="text-yellow-400" />,
        comment: <MessageSquare size={18} className="text-purple-400" />,
        deleted: <Trash2 size={18} className="text-red-400" />,
    };

    return (
        <div className="space-y-6">
            {history.map((event, i) => (
                <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4 items-start"
                >
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-800 p-2 rounded-full">{iconMap[event.type]}</div>
                        {i < history.length - 1 && <div className="w-px h-full bg-gray-700 mt-2" />}
                    </div>
                    <div>
                        <p className="text-gray-200">{event.message}</p>
                        <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// 🔹 Main Page
const IssueDetailsPage: React.FC<IssueDetailsPageProps> = ({
    initialComments = [],
    issue,
    history = [],
}) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState("");
    const [status, setStatus] = useState(issue.status);
    const [activeTab, setActiveTab] = useState("Comments");
    const [historyState, setHistoryState] = useState<HistoryEvent[]>(sampleHistory);

    // Swipe support 👇
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            if (activeTab === "Comments") setActiveTab("History");
        },
        onSwipedRight: () => {
            if (activeTab === "History") setActiveTab("Comments");
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    // Add Comment
    const addComment = () => {
        if (!newComment.trim()) return;

        const newC: Comment = { id: Date.now(), author: "You", text: newComment };
        setComments((prev) => [...prev, newC]);

        setHistoryState((prev) => [
            ...prev,
            {
                id: Date.now(),
                type: "comment",
                message: `You commented: "${newComment}"`,
                date: new Date().toLocaleString(),
            },
        ]);

        setNewComment("");
    };

    // Delete Comment
    const deleteComment = (id: number) => {
        const deleted = comments.find((c) => c.id === id);
        if (deleted) {
            setHistoryState((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    type: "deleted",
                    message: `You deleted a comment: "${deleted.text}"`,
                    date: new Date().toLocaleString(),
                },
            ]);
        }
        setComments((prev) => prev.filter((c) => c.id !== id));
    };

    // Status Change
    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        setHistoryState((prev) => [
            ...prev,
            {
                id: Date.now(),
                type: "status",
                message: `Status changed to "${newStatus}"`,
                date: new Date().toLocaleString(),
            },
        ]);
    };

    return (
        <div className="p-4 text-white flex flex-col lg:flex-row gap-6">
            {/* Left Section */}
            <div className="flex-1 space-y-6" {...swipeHandlers}>
                {/* Title */}
                <h1 className="text-2xl font-bold">{issue.title}</h1>
                <p className="text-gray-300">{issue.description}</p>

                {/* Tabs */}
                <div className="flex space-x-6 border-b border-gray-700">
                    {["Overview", "Comments", "History"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 relative text-sm font-medium transition ${activeTab === tab
                                ? "text-yellow-400"
                                : "text-gray-400 hover:text-gray-200"
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-yellow-400 rounded"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === "Comments" && (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        <CommentInput
                            newComment={newComment}
                            setNewComment={setNewComment}
                            addComment={addComment}
                        />
                        <AnimatePresence>
                            {comments.map((c) => (
                                <CommentItem key={c.id} comment={c} onDelete={deleteComment} />
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {activeTab === "History" && (
                    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 max-h-[60vh] overflow-y-auto">
                        <HistoryTimeline history={historyState} />
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <IssueSidebar status={status} setStatus={handleStatusChange} issue={issue} />
        </div>
    );
};

export default IssueDetailsPage;
