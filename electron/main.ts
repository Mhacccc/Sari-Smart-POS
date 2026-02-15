/**
 * Electron Main Process
 *
 * Spawns the Next.js standalone server as a child process,
 * waits for it to be ready, then opens a BrowserWindow.
 *
 * This file is compiled separately from Next.js (excluded in tsconfig.json).
 * It will be implemented fully in Phase 6.
 */

// import { app, BrowserWindow } from "electron";
// import { fork } from "child_process";
// import path from "path";

// const NEXT_SERVER_PORT = 3000;

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1280,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//       contextIsolation: true,
//       nodeIntegration: false,
//     },
//   });
//
//   win.loadURL(`http://localhost:${NEXT_SERVER_PORT}`);
// }

// app.whenReady().then(() => {
//   // Spawn Next.js standalone server
//   const server = fork(path.join(__dirname, "../.next/standalone/server.js"), {
//     env: { ...process.env, PORT: String(NEXT_SERVER_PORT) },
//   });
//
//   // Wait for server to be ready, then open the window
//   setTimeout(createWindow, 2000);
// });
