import { useState } from "react";

type Case = {
  id: number;
  title: string;
  status: string;
};

function App() {
  const [cases, setCases] = useState<Case[]>([]);

  const fetchCases = async () => {
    const res = await fetch("http://localhost:3001/api/cases");
    const data = await res.json();
    setCases(data);
  };

  return (
    <div>
      <h1>案件列表 Demo</h1>

      <button onClick={fetchCases}>查詢案件</button>

      <ul>
        {cases.map((c) => (
          <li key={c.id}>
            {c.title} - {c.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;