import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRoutes } from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (request, response) => {
  return response.json({
    message: "Hostly API running 🚀",
  });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
