import React, { useState, useEffect, KeyboardEvent } from "react";
import { X, Search, Users } from "lucide-react";

interface InviteModalProps {
    isOpen: boolean;
    onClose: () => void;
    suggestions?: string[];
    onInvite: (values: string[]) => void;
}

const InviteModal: React.FC<InviteModalProps> = ({
    isOpen,
    onClose,
    suggestions = [],
    onInvite,
}) => {
    const [input, setInput] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        if (input.trim()) {
            const filtered = suggestions.filter(
                (s) =>
                    s.toLowerCase().includes(input.toLowerCase()) &&
                    !selected.includes(s)
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    }, [input, suggestions, selected]);

    const addMember = (member: string) => {
        if (!selected.includes(member)) {
            setSelected((prev) => [...prev, member]);
        }
        setInput("");
    };

    const removeMember = (member: string) => {
        setSelected((prev) => prev.filter((m) => m !== member));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && input.trim()) {
            addMember(input.trim());
        }
        if (e.key === "Escape") {
            onClose();
        }
        if (e.key === "Backspace" && !input && selected.length > 0) {
            removeMember(selected[selected.length - 1]);
        }
    };

    const handleInvite = () => {
        if (selected.length > 0) {
            onInvite(selected);
            setSelected([]);
            setInput("");
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            {/* Modal */}
            <div className="bg-black backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-80 sm:w-96 shadow-2xl animate-scale-in">
                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-2">
                        <Users className="w-6 h-6 " />
                        <h2 className="text-xl font-semibold text-white">Invite Members</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Selected Tags */}
                {selected.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {selected.map((member, idx) => (
                            <div
                                key={idx}
                                className="flex items-center bg-green-500/80 text-white px-3 py-1.5 rounded-full text-sm shadow-md"
                            >
                                {member}
                                <button
                                    className="ml-2 hover:text-gray-200"
                                    onClick={() => removeMember(member)}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search or add members..."
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition placeholder-gray-400"
                    />
                </div>

                {/* Suggestions Dropdown */}
                {input.trim() && (
                    <div className="mt-3 max-h-48 overflow-y-auto bg-white/10 rounded-xl border border-white/20 shadow-inner">
                        {filteredSuggestions.length > 0 ? (
                            filteredSuggestions.map((s, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => addMember(s)}
                                    className="px-4 py-2 cursor-pointer hover:bg-green-500/30 text-gray-100 rounded-lg transition"
                                >
                                    {s}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-400">No results found.</div>
                        )}
                    </div>
                )}

                {/* Invite Button */}
                <button
                    onClick={handleInvite}
                    disabled={selected.length === 0}
                    className="mt-6 w-full py-2.5 bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl "
                >
                    Invite Members
                </button>
            </div>
        </div>
    );
};

export default InviteModal;
