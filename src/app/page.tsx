export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <main className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          🛒 Sari-Smart POS
        </h1>
        <p className="max-w-md text-lg text-foreground/60">
          Offline-first Point of Sale for Filipino sari-sari stores.
        </p>
      </main>
    </div>
  );
}
