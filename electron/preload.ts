/**
 * Electron Preload Script — Secure IPC Bridge
 *
 * Exposes a safe API to the renderer process (React) via contextBridge.
 * React components access hardware through `window.electronAPI`.
 *
 * NEVER import Node.js modules directly in React — always go through this bridge.
 *
 * Will be implemented in Phase 6.
 */

// import { contextBridge, ipcRenderer } from "electron";

// contextBridge.exposeInMainWorld("electronAPI", {
//   // Printer
//   printReceipt: (receiptData: unknown) =>
//     ipcRenderer.invoke("print-receipt", receiptData),
//
//   // Scanner
//   onBarcodeScanned: (callback: (barcode: string) => void) =>
//     ipcRenderer.on("barcode-scanned", (_event, barcode) => callback(barcode)),
// });
