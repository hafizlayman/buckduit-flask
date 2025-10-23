import React, { useEffect, useState } from "react";

// Use env var if present, otherwise default to your Render backend
const API_BASE =
  process.env.REACT_APP_API_BASE || "https://buckduit-backend.onrender.com";

export default function App() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/tools`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setTools(Array.isArray(json.data) ? json.data : []);
      } catch (e) {
        setError("Failed to load tools from the backend.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-6 py-5">
          <h1 className="text-2xl font-semibold">
            💰 BuckDuit — One-Stop Earning Apps
          </h1>
          <p className="text-sm text-gray-500">
            Data from <code>{API_BASE}</code>
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        {loading && <p className="text-gray-500">Loading tools…</p>}
        {error && (
          <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-4 sm:grid-cols-2">
            {tools.map((tool, i) => (
              <div
                key={`${tool.name}-${i}`}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <h2 className="text-lg font-semibold">{tool.name}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Category:{" "}
                  <span className="font-medium text-gray-700">
                    {tool.category}
                  </span>
                </p>
                <span className="mt-3 inline-block rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                  {tool.status}
                </span>
              </div>
            ))}

            {/* When no records */}
            {tools.length === 0 && (
              <div className="rounded-xl border bg-white p-5 text-sm text-gray-500">
                No tools found.
              </div>
            )}
          </div>
        )}

        <footer className="mt-12 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} BuckDuit
        </footer>
      </main>
    </div>
  );
}
