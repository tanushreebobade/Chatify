import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ENV } from './lib/env.js';
import { app, server, isOriginAllowed } from './lib/socket.js';

dotenv.config();

const PORT = ENV.PORT;
// Resolve relative to this file (not process.cwd()) so it works no matter
// where the process is started from (local dev, PM2, Render, etc.)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Trust the first proxy hop (Render's load balancer sits in front of us)
// so req.ip and related checks reflect the real client, not the proxy.
app.set('trust proxy', 1);

app.use(express.json({limit:'10mb'}));
app.use(cors({
    origin: (origin, callback) => {
        if (isOriginAllowed(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true 
}));
app.use(cookieParser());

// Lightweight health check for uptime checks / Render / load balancers
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        version: "TEST-123"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.get("/check", (req, res) => {
    console.log("Cookies:", req.cookies);
    res.json(req.cookies);
});

// Deployed split — frontend on Vercel, backend on Render — so the frontend
// build normally isn't present here. Only serve it if it happens to exist
// (e.g. local `npm run build` from the repo root), so a standalone backend
// deploy doesn't 500 on unmatched routes.
const frontendDistPath = path.join(__dirname,"../../frontend/dist");
if(ENV.NODE_ENV === "production" && fs.existsSync(frontendDistPath)){
    app.use(express.static(frontendDistPath));

    app.use((req,res)=>{
        res.sendFile(path.join(frontendDistPath,"index.html"));
    })
}

server.listen(PORT, () => {
  console.log('Server is running on port '+ PORT);
  connectDB();
});