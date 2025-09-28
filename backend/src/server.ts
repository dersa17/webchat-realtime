import express from "express";
import { ENV } from "./lib/env";
import router from "./route";
import path from "path";
import { connectDB } from "./lib/db";
import cookieParser from "cookie-parser"
import cors from "cors";
import { app, server } from "./lib/socket";




const PORT = ENV.PORT || 3000;

app.use(express.json({limit: "5mb"}))
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}));
app.use(cookieParser())

app.use("/api", router);

// Deploy sebagai SPA (Single Page Application)
if (ENV.NODE_ENV == "production") {
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
  connectDB()

});
