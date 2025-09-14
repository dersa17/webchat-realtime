import express from "express";
import dotenv from "dotenv";
import router from "./route";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api", router);

// Deploy sebagai SPA (Single Page Application)
if (process.env.NODE_ENV == "production") {
  // Path absolut ke folder build frontend
  const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");

  // Serve semua file statis frontend (JS, CSS, gambar, dll)
  app.use(express.static(frontendDistPath));

  // Semua route lain diarahkan ke index.html (SPA entry point)
  app.get("*", (_, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
