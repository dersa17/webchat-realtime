import express from "express";
import { ENV } from "./lib/env.js";
import router from "./route.js";
import path from "path";
import { fileURLToPath } from "url"; 
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

const PORT = ENV.PORT || 3000;

// definisikan __dirname secara manual untuk ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "5mb" }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api", router);

// Deploy sebagai SPA (Single Page Application)
if (ENV.NODE_ENV === "production") {
  // Path absolut ke folder build frontend
  const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");

  // Serve semua file statis frontend (JS, CSS, gambar, dll)
  app.use(express.static(frontendDistPath));

  // Semua route lain diarahkan ke index.html (SPA entry point)
  app.get("*", (_, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB();
});
