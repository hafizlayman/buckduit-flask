// ==========================================
// BuckDuit Frontend — React + API Integration
// ==========================================

import React, { useEffect, useState } from "react";

const API_BASE = "https://buckduit-backend.onrender.com";

function App() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/tools`)
      .then((res) => res.json())
      .then((data) => {
        setTools(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API fetch failed:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading tools ...</h2>;

  return (
    <div style={{ fontFamily: "sans-serif", margin: "40px auto", maxWidth: "700px" }}>
      <h1 style={{ textAlign: "center" }}>💼 BuckDuit Earning Tools</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tools.map((t, i) => (
          <li
            key={i}
            style={{
              margin: "15px 0",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#fafafa",
            }}
          >
            <h3>{t.name}</h3>
            <p>
              Category: <b>{t.category}</b> | Status: <b>{t.status}</b>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
