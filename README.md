# 🏛️ Sari-Smart POS: Architecture & Directory Standards

This document outlines the folder structure, naming conventions, and architectural rules for the Sari-Smart POS project. It ensures that the Next.js frontend, Electron backend, and Supabase integration remain scalable and clean.

## 🏗️ Runtime Architecture

Next.js runs as a **standalone server** inside Electron — not as a static export. This preserves Server Actions, SSR, and streaming, all running locally without internet.

```text
┌─────────────────────────────────────────────┐
│              Electron Main Process          │
│  ┌────────────────┐  ┌───────────────────┐  │
│  │ Next.js Server │  │ Hardware Drivers  │  │
│  │ (localhost:3000)│  │ (Printer/Scanner) │  │
│  └───────┬────────┘  └────────┬──────────┘  │
│          │        IPC         │             │
│  ┌───────┴────────────────────┴──────────┐  │
│  │         BrowserWindow (Renderer)      │  │
│  │  React UI + Zustand + TanStack Query  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
                     │ (when online)
              ┌──────┴──────┐
              │  Supabase   │
              │ (Cloud Sync)│
              └─────────────┘
```

## 📂 Directory Structure

We use a unified Next.js App Router workspace, tightly integrated with an Electron main process folder.

```text
sari-smart-pos/
├── electron/                   # Desktop OS & Hardware Layer
│   ├── main.ts                 # Spawns Next.js server + opens BrowserWindow
│   ├── preload.ts              # Secure IPC bridge (React <-> Node.js)
│   └── hardware/               # Drivers for physical devices
│       ├── printer.ts          # ESC/POS thermal printer logic
│       └── scanner.ts          # Barcode listener utilities
├── src/                        # Frontend Codebase (Next.js)
│   ├── app/                    # Next.js App Router (Pages & Layouts)
│   │   ├── (admin)/            # Cloud Dashboard Routes (Grouped)
│   │   │   ├── dashboard/      # Admin analytics
│   │   │   └── inventory/      # Product management
│   │   ├── (terminal)/         # Cashier POS Routes (Grouped)
│   │   │   └── pos/            # Main checkout screen
│   │   ├── api/                # Webhooks only (No standard API routes)
│   │   ├── layout.tsx          # Root HTML/Body wrapper
│   │   └── globals.css         # Tailwind base styles
│   ├── components/             # Reusable UI Elements
│   │   ├── ui/                 # Shadcn/UI primitives (Buttons, Inputs)
│   │   └── shared/             # Complex app components (ProductCard, CartSidebar)
│   ├── hooks/                  # Custom React Hooks
│   │   └── use-offline-sync.ts # Monitors connectivity, syncs IndexedDB queue to Supabase
│   ├── lib/                    # Core Utilities & Configurations
│   │   ├── supabase/           # Supabase client & SSR setup
│   │   │   ├── client.ts       # Browser client (createBrowserClient)
│   │   │   └── server.ts       # Server client (createServerClient)
│   │   └── utils.ts            # Tailwind `cn` merger and formatting helpers
│   ├── server/                 # Next.js Server Actions ("use server")
│   │   ├── actions/            # Database mutations (checkout, addProduct)
│   │   └── queries/            # Database reads (getInventory, getSales)
│   ├── store/                  # Global Client State (Zustand)
│   │   └── cart-store.ts       # Active POS transaction state (persisted to IndexedDB)
│   └── types/                  # Shared TypeScript Interfaces
│       ├── database.types.ts   # Supabase-generated types (npx supabase gen types)
│       └── index.ts            # Business domain interfaces (Order, Product, Customer)
├── supabase/                   # Database Infrastructure
│   ├── migrations/             # SQL schema versions (UUIDs for all PKs)
│   └── seed.sql                # Dummy data for testing
├── .antigravity-rules          # AI Developer Context
├── next.config.mjs             # Next.js standalone output settings for Electron
└── tailwind.config.ts          # Tailwind theme and plugin setup
```