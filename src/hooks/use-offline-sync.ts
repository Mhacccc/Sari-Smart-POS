"use client";

import { useEffect, useState } from "react";

/**
 * Monitors network connectivity and provides online/offline status.
 *
 * In Phase 4, this hook will also:
 * - Flush the IndexedDB offline queue to Supabase on reconnect
 * - Retry failed mutations automatically
 *
 * For now, it exposes the connectivity state for UI indicators.
 */
export function useOfflineSync() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // Set initial state
        setIsOnline(navigator.onLine);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return { isOnline };
}
