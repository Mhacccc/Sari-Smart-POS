# 🛒 Sari-Smart POS: AI Developer Context & Rules

## 1. Project Overview
You are assisting in building **Sari-Smart POS**, a modernized, offline-first Point of Sale (POS) and Inventory Management system designed specifically for Filipino sari-sari stores and local retail businesses. 

The core challenge this app solves is **internet instability**. The cashier terminal must be able to process sales and add items to the cart with zero latency and without an active internet connection, syncing to the cloud only when the connection is restored.

## 2. Tech Stack & Architecture
* **Frontend Framework:** Next.js 15 (App Router strictly, no Pages router).
* **Desktop Shell:** Electron (wraps the Next.js app for native hardware access).
* **Electron Runtime Model:** Next.js runs as a **standalone server** (`output: 'standalone'` in `next.config.ts`) inside Electron. Electron spawns a local Node.js server and loads `http://localhost:3000` in the BrowserWindow. This preserves Server Actions, SSR, and streaming — all running locally, no internet required.
* **Backend & Database:** Supabase (PostgreSQL, Auth, Real-time) — used for cloud sync and admin features. Not required for offline POS operations.
* **State Management:** Zustand (for high-speed, local cart management) with `zustand/middleware` persist to IndexedDB for surviving app restarts.
* **Offline Persistence:** IndexedDB (via Dexie.js) for queuing offline transactions. Offline sales are stored locally and synced to Supabase when connectivity is restored.
* **Styling:** Tailwind CSS + Shadcn UI + Lucide React icons.
* **Data Fetching:** TanStack Query (React Query) for **client-side read caching**. Server Actions handle **mutations**. These are complementary — TanStack Query caches data fetched via Server Actions or Supabase queries, providing instant re-renders and stale-while-revalidate behavior.

## 3. Strict Coding Guidelines (AI MUST FOLLOW)

### Next.js & React
* **Use App Router:** All routes must use the `app/` directory. NEVER use the `pages/` directory.
* **Server Actions:** Favor Next.js Server Actions (`"use server"`) for database mutations over traditional `/api` route handlers. Server Actions execute on the local standalone server inside Electron — they work fully offline.
* **Client Components:** Keep `"use client"` boundaries as low in the component tree as possible. Only use them when interactivity (hooks, event listeners) is strictly required.
* **Streaming:** Utilize React Suspense and `loading.tsx` for asynchronous data fetching.

### Supabase Integration
* **Package:** You MUST use `@supabase/ssr` and `@supabase/supabase-js`. 
* **Banned Package:** You MUST NEVER import from `@supabase/auth-helpers-nextjs` (it is deprecated).
* **Client Setup:** The `src/lib/supabase/` directory must contain separate client factories — `client.ts` for browser clients (`createBrowserClient`) and `server.ts` for server clients (`createServerClient`).
* **Cookies:** When manipulating cookies in server components/actions, you MUST ONLY use the `getAll` and `setAll` methods. Never use `get`, `set`, or `remove`.

### Database & Sync Logic (Crucial)
* **UUIDs:** All database primary keys (Orders, Products, Customers) MUST use `UUID` strings, not auto-incrementing integers. This is mandatory to prevent primary key collisions when syncing offline transactions to the cloud.
* **Optimistic UI:** When the cashier completes a sale, the UI must update instantly via Zustand, while the Supabase mutation happens silently in the background.
* **Offline Queue:** Failed Supabase mutations (due to no connectivity) must be queued in IndexedDB and retried automatically when the connection is restored via the `use-offline-sync` hook.

### TypeScript & Styling
* **Strict Typing:** Write concise, strongly typed TypeScript. Avoid `any`. Prefer `interfaces` over `types`.
* **Shared Types:** All shared TypeScript interfaces and Supabase-generated types live in `src/types/`. Use `npx supabase gen types` to generate `database.types.ts`.
* **Styling:** Use Tailwind CSS for all styling. Use `clsx` and `tailwind-merge` for dynamic classes. Do not write custom CSS files unless absolutely necessary.

### Electron & Next.js Integration
* **Build Output:** `next.config.ts` MUST use `output: 'standalone'`. NEVER use `output: 'export'` — it disables Server Actions and SSR.
* **Electron Main Process:** `electron/main.ts` spawns the Next.js standalone server as a child process, waits for it to be ready, then opens the BrowserWindow pointing to `http://localhost:3000`.
* **IPC Bridge:** `electron/preload.ts` exposes a secure context bridge. React components communicate with hardware (printer, scanner) exclusively via `window.electronAPI` — never import Node.js modules directly in React.

## 4. Specific Business Logic (The "Filipino Context")
* **"Utang" (Credit):** The system includes a feature for tracking customer credit. Transactions can have a payment method of `CREDIT`, which links to a customer's debt ledger. Related Server Actions go in `src/server/actions/`.
* **Hardware:** The Electron main process will handle native ESC/POS thermal printers and HID barcode scanners. React components should communicate with hardware via Electron's `ipcRenderer` through the preload bridge.

## 5. AI Interaction Rules
* **No Unnecessary Filler:** Provide direct, technical answers. Skip apologies or generic pleasantries.
* **Explain Logic First:** Before writing complex syncing or hardware integration code, explain the step-by-step logic and architectural choices.
* **Don't Break Things:** Do not introduce breaking changes to existing files without asking for confirmation first.
* **Test-Driven Mentality:** When writing complex business logic (like tax calculation or cart totals), ensure edge cases (e.g., negative quantities, zero-priced items) are handled.