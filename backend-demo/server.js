const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

// 假裝資料庫
const cases = [
  { id: 1, title: "排水改善案 A", status: "進行中" },
  { id: 2, title: "工區道路案 B", status: "已結案" }
];

app.get("/api/cases", (req, res) => {
  res.json(cases);
});

app.listen(port, () => {
  console.log(`後端啟動在 http://localhost:${port}`);
});