import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import childrenRoutes from "./routes/children.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import groupRoutes from "./routes/group.routes.js";

const app = express();
const PORT = 5417;
const connectionString = process.env.DB_URL;

async function connectionDB() {
  try {
    await mongoose.connect(connectionString);
    console.log("Подключено к базе данных!");
  } catch (error) {
    console.log("Error!");
  }
}

app.use(express.json());
app.use("/children", childrenRoutes);
app.use("/teacher", teacherRoutes);
app.use("/group", groupRoutes);

app.listen(PORT, async () => {
  await connectionDB();
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
