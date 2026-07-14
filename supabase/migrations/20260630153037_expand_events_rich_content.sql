/*
# Expand events table with rich article content

1. Overview
Adds columns to the events table to support rich article content,
evidence sources, ripple effect stages, and connected entities.
This enables the enhanced EventPage to display full editorial articles.

2. Modified Tables
- events: adds article_body (jsonb), ripple_stages (jsonb),
  connected_entities (jsonb), interesting_facts (jsonb), location (text)
- These are all nullable so existing rows remain valid.

3. Security
- No RLS policy changes needed — existing public read policy covers new columns.
*/

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS article_body jsonb,
  ADD COLUMN IF NOT EXISTS ripple_stages jsonb,
  ADD COLUMN IF NOT EXISTS connected_entities jsonb,
  ADD COLUMN IF NOT EXISTS interesting_facts jsonb,
  ADD COLUMN IF NOT EXISTS location text;
