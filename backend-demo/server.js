const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

// ===== 模擬資料庫 =====
const cases = [
  {
    id: "CASE-2024-001",
    name: "排水改善工程－第一期",
    status: "in_progress",   // 狀態用 code，不用中文
    owner: "水利組",
    location: "新北市板橋區",
    startDate: "2024-03-01",
    endDate: null,
    budget: 12000000,
    updatedAt: "2024-12-01T10:30:00Z"
  },
  {
    id: "CASE-2023-017",
    name: "工區道路改善工程",
    status: "closed",
    owner: "工務組",
    location: "新北市三重區",
    startDate: "2023-06-15",
    endDate: "2023-11-30",
    budget: 8500000,
    updatedAt: "2023-12-05T08:10:00Z"
  }
];

// ===== Step 2：案件列表 API =====
app.get("/api/cases", (req, res) => {
  const { status, owner } = req.query;

  let result = cases;

  if (status) {
    result = result.filter(c => c.status === status);
  }

  if (owner) {
    result = result.filter(c => c.owner === owner);
  }

  res.json({
    total: result.length,
    data: result
  });
});

// ===== Step 3：單筆案件 API（補在這裡）=====
app.get("/api/cases/:id", (req, res) => {
  const { id } = req.params;
  const item = cases.find(c => c.id === id);

  if (!item) {
    return res.status(404).json({ message: "Case not found" });
  }

  res.json(item);
});

// ===== Server 啟動 =====
app.listen(port, () => {
  console.log(`後端啟動在 http://localhost:${port}`);
});