import { useState } from "react";
import { STATUS_TEXT_MAP } from "./constants/status";
import "./App.css";

type Case = {
  id: string;
  name: string;
  status: string;
};

function App() {
  const [cases, setCases] = useState<Case[]>([]);

  const fetchCases = async () => {
    const res = await fetch("http://localhost:3001/api/cases");
    const data = await res.json();
    setCases(data.data);
  };

  return (
    <div className="App">
      <h1 className="page-title">案件列表 Demo</h1>

      <button onClick={fetchCases}>查詢案件</button>

      <ul className="case-list">
        {cases.map((c) => (
          <li key={c.id} className="case-item">
          {c.name}
          <span> - {STATUS_TEXT_MAP[c.status] ?? c.status}</span>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;