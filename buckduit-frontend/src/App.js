import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./index.css"; // ✅ Make sure Tailwind CSS classes apply properly

function App() {
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  // --- Fetch API data from Flask ---
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/tools")
      .then((res) => res.json())
      .then((data) => setTools(data.data))
      .catch((err) => console.error("API error:", err));
  }, []);

  // --- Filter logic ---
  const filteredTools = tools.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.status.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const countByStatus = (status) =>
    tools.filter((t) => t.status.toLowerCase() === status.toLowerCase()).length;

  const total = tools.length;

  return (
    <div className={`${darkMode ? "dark" : ""} font-sans`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 transition-colors duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span>💰</span> BuckDuit Dashboard
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-800 dark:bg-yellow-400 text-white dark:text-black px-4 py-2 rounded shadow hover:opacity-80 transition"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <AnimatedCard title="Total" value={total} color="bg-blue-500" />
          <AnimatedCard title="Active" value={countByStatus("Active")} color="bg-green-500" />
          <AnimatedCard title="Trusted" value={countByStatus("Trusted")} color="bg-emerald-500" />
          <AnimatedCard title="Verified" value={countByStatus("Verified")} color="bg-indigo-500" />
          <AnimatedCard title="Pending" value={countByStatus("Pending")} color="bg-yellow-500" />
        </div>

        {/* Search + Filter */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="🔍 Search tools..."
            className="border px-4 py-2 rounded w-full sm:w-1/3 dark:bg-gray-800 dark:border-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {["All", "Active", "Trusted", "Verified", "Pending"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-2 rounded text-sm font-medium ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Table */}
        <div className="overflow-x-auto rounded shadow bg-white dark:bg-gray-800">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-left px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.map((tool, i) => (
                <tr
                  key={i}
                  className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-2">{tool.name}</td>
                  <td className="px-4 py-2">{tool.category}</td>
                  <td className={`px-4 py-2 font-semibold ${statusColor(tool.status)}`}>
                    {tool.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          BuckDuit v1.0 — Powered by Flask + React + Tailwind ✨
        </p>
      </div>
    </div>
  );
}

// --- Animated Card Component ---
const AnimatedCard = ({ title, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className={`${color} text-white p-4 rounded-lg shadow-lg`}
  >
    <h2 className="text-lg font-medium">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </motion.div>
);

// --- Status Colors ---
const statusColor = (status) => {
  switch (status) {
    case "Active":
      return "text-green-600 dark:text-green-400";
    case "Trusted":
      return "text-emerald-600 dark:text-emerald-400";
    case "Pending":
      return "text-yellow-600 dark:text-yellow-400";
    case "Verified":
      return "text-indigo-600 dark:text-indigo-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
};

export default App;
