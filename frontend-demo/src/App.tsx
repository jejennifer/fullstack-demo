import { useEffect, useState } from "react";
import { STATUS_TEXT_MAP } from "./constants/status";
import "./App.css";

type Case = {
  id: string;
  name: string;
  status: string;
};

function App() {
  const [cases, setCases] = useState<Case[]>([]);

  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredCases = cases.filter((c) => {
    if (filterStatus === "all") return true;
    return c.status === filterStatus;
  });

  useEffect(() => {
  fetchCases();
  }, []);

  const fetchCases = async () => {
    const res = await fetch("http://localhost:3001/api/cases");
    const data = await res.json();
    setCases(data.data);
  };

  return (
    <div className="App">
      <h1 className="page-title">案件列表</h1>

      <div className="search-bar">
        <span className="search-label">查詢案件：</span>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">全部案件</option>
          <option value="in_progress">進行中</option>
          <option value="closed">已結案</option>
        </select>
      </div>

      <ul className="case-list">
        {filteredCases.map((c) => (
          <li key={c.id} className="case-card">
          <div className="case-title">{c.name}</div>

          <span className={`case-badge ${c.status}`}>
            {STATUS_TEXT_MAP[c.status] ?? c.status}
          </span>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;