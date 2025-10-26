"use client";

import React, { useState, useEffect } from "react";
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
  Loader2,
  AlertTriangle,
} from "lucide-react";
import axiosInstance from "@/services/axiosConfig";

interface Comment {
  id: number;
  author: string;
  text: string;
}

interface IssueDetails {
  id: number;
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


/* 🔹 Comment Item */
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

/* 🔹 Comment Input */
const CommentInput: React.FC<{
  newComment: string;
  setNewComment: (text: string) => void;
  addComment: () => void;
}> = ({ newComment, setNewComment, addComment }) => (
  <div className="flex flex-col sm:flex-row gap-2 bg-gray-800/40 p-3 rounded-xl w-full">
    <div className="flex items-center gap-2 w-full">
      <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-full w-10 h-10 flex items-center justify-center text-black font-bold shadow text-sm">
        Y
      </div>
      <input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
      />
    </div>

    <button
      onClick={addComment}
      className="mt-2 sm:mt-0 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg shadow hover:opacity-90 transition w-full sm:w-auto text-sm sm:text-base"
    >
      Send
    </button>
  </div>
);

/* 🔹 Sidebar */
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
        className="appearance-none w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option value="TO_DO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>

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

/* 🔹 History Timeline */
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
interface IssueDetailsPageProps {
  issueId: string;
}

/* 🔹 Main Component */
const IssueDetailsPage: React.FC<IssueDetailsPageProps> = ({ issueId }) => {
  const [issue, setIssue] = useState<IssueDetails | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [history, setHistory] = useState<HistoryEvent[]>([]);
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("Comments");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* 🔹 Fetch issue data */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [issueRes, commentRes, historyRes] = await Promise.all([
          axiosInstance.get(`/issues/${issueId}`),
          axiosInstance.get(`/issues/${issueId}/comments`),
          axiosInstance.get(`/issues/${issueId}/history`),
        ]);
        setIssue(issueRes.data);
        setComments(commentRes.data || []);
        setHistory(historyRes.data || []);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load issue data. Please check authentication or server logs.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [issueId]);

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axiosInstance.post(`/issues/${issueId}/comments`, { text: newComment });
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch {
      alert("Failed to post comment");
    }
  };

  const deleteComment = async (id: number) => {
    try {
      await axiosInstance.delete(`/comments/${id}`);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("Failed to delete comment");
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await axiosInstance.put(`/issues/${issueId}/status/${newStatus}`);
      setIssue((prev) => (prev ? { ...prev, status: newStatus } : prev));
    } catch {
      alert("Failed to update status");
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => activeTab === "Comments" && setActiveTab("History"),
    onSwipedRight: () => activeTab === "History" && setActiveTab("Comments"),
    trackMouse: true,
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        <Loader2 className="animate-spin mr-2" /> Loading issue details...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-red-500 gap-2">
        <AlertTriangle /> {error}
      </div>
    );

  if (!issue) return null;

  return (
    <div className="px-4 text-white flex flex-col lg:flex-row gap-6" {...swipeHandlers}>
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">{issue.title}</h1>
        <p className="text-gray-300">{issue.description}</p>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-700">
          {["Comments", "History"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 relative text-sm font-medium transition ${
                activeTab === tab ? "text-yellow-400" : "text-gray-400 hover:text-gray-200"
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

        {/* Tab Content */}
        {activeTab === "Comments" && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <CommentInput newComment={newComment} setNewComment={setNewComment} addComment={addComment} />
            <AnimatePresence>
              {comments.map((c) => (
                <CommentItem key={c.id} comment={c} onDelete={deleteComment} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {activeTab === "History" && (
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 max-h-[60vh] overflow-y-auto">
            <HistoryTimeline history={history} />
          </div>
        )}
      </div>

      <IssueSidebar status={issue.status} setStatus={handleStatusChange} issue={issue} />
    </div>
  );
};

export default IssueDetailsPage;
