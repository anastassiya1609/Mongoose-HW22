import express from "express";
import cors from "cors";
import childrenRoutes from "./routes/children.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import groupRoutes from "./routes/group.routes.js";
import { connectionDB } from "./config/db.js";

const app = express();
const PORT = 5417;



app.use(cors());
app.use(express.json());
app.use("/children", childrenRoutes);
app.use("/teacher", teacherRoutes);
app.use("/group", groupRoutes);

app.listen(PORT, async () => {
  await connectionDB();
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
