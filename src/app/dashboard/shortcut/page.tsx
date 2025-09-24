"use client";

const shortcuts = [
  { keys: ["Ctrl", "I"], description: "Invite a user" },
  { keys: ["Ctrl", "S"], description: "Save current chat" },
  { keys: ["Ctrl", "N"], description: "Start a new chat" },
  { keys: ["Ctrl", "F"], description: "Search messages" },
  { keys: ["Ctrl", "D"], description: "Delete selected message" },
];

export default function Shortcut() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
        Keyboard Shortcuts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shortcuts.map((shortcut, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-center justify-between gap-2 p-4 bg-gray-800/90 border border-gray-700 rounded-lg shadow-md transition hover:bg-gray-800"
          >
            <div className="flex gap-1 flex-wrap justify-center sm:justify-start">
              {shortcut.keys.map((key, i) => (
                <kbd
                  key={i}
                  className="bg-gray-700 text-sm px-2 py-1 rounded shadow-inner font-medium"
                >
                  {key}
                </kbd>
              ))}
            </div>
            <span className="text-sm text-gray-300 text-center sm:text-left mt-2 sm:mt-0">
              {shortcut.description}
            </span>
          </div>
        ))}
      </div>

      {/* Optional fixed tip at bottom */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800/90 text-gray-300 px-4 py-2 rounded-lg shadow-md border border-gray-700 text-sm">
        Press <kbd className="bg-gray-700 px-1 rounded">Ctrl</kbd> +{" "}
        <kbd className="bg-gray-700 px-1 rounded">?</kbd> to view shortcuts anytime
      </div>
    </div>
  );
}
