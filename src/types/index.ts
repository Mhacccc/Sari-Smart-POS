/**
 * Sari-Smart POS — Business Domain Interfaces
 *
 * All shared TypeScript interfaces live here.
 * Supabase-generated types go in database.types.ts (via `npx supabase gen types`).
 */

/** Possible payment methods for a transaction */
export type PaymentMethod = "CASH" | "CREDIT" | "GCASH";

/** A product in the inventory */
export interface Product {
    id: string; // UUID
    name: string;
    barcode: string | null;
    price: number;
    cost: number;
    stock: number;
    category: string | null;
    image_url: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

/** A single item in the cart / order */
export interface OrderItem {
    id: string; // UUID
    order_id: string;
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
}

/** A completed or pending order */
export interface Order {
    id: string; // UUID
    items: OrderItem[];
    total: number;
    payment_method: PaymentMethod;
    customer_id: string | null;
    cashier_id: string | null;
    is_synced: boolean;
    created_at: string;
}

/** A customer with optional credit (utang) tracking */
export interface Customer {
    id: string; // UUID
    name: string;
    phone: string | null;
    credit_balance: number; // outstanding utang
    created_at: string;
}

/** A record in the credit (utang) ledger */
export interface CreditLedgerEntry {
    id: string; // UUID
    customer_id: string;
    order_id: string | null;
    amount: number; // positive = debt added, negative = payment made
    description: string;
    created_at: string;
}
