import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());

app.get("/api/data/:district", (req, res) => {
  const district = req.params.district;
  const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
  if (data[district]) res.json(data[district]);
  else res.json([]);
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
