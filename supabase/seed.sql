-- Sari-Smart POS: Seed Data
-- Dummy products for development and testing

INSERT INTO products (id, name, barcode, price, cost, stock, category, is_active)
VALUES
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Lucky Me Pancit Canton', '4800024012289', 14.00, 11.00, 50, 'Noodles', true),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'Kopiko Brown Coffee', '4800014152129', 7.00, 5.50, 100, 'Beverages', true),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Argentina Corned Beef 175g', '4800038612558', 45.00, 38.00, 30, 'Canned Goods', true),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', 'Tide Powder Detergent 80g', '4902430739382', 12.00, 9.50, 80, 'Household', true),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', 'Skyflakes Crackers', '4800092150654', 10.00, 7.50, 60, 'Snacks', true);

-- NOTE: The actual products table schema will be created in supabase/migrations/
-- This seed file assumes the migration has already run.
