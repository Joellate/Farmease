-- Migration: add phone to users and create messages table

-- Add phone column to FarmEase users
ALTER TABLE IF EXISTS "FarmEase".users
  ADD COLUMN IF NOT EXISTS phone text;
-- (Messaging table removed from this migration.)
