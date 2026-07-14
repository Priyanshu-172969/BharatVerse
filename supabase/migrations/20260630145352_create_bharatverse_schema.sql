/*
# BharatVerse Core Schema

1. Overview
Creates the foundational content tables for the BharatVerse historical
exploration platform: civilizations, dynasties, personalities, events,
evidence sources, and collections. All content is intentionally public
(single-tenant, no sign-in) so the anon-key frontend can read everything.

2. New Tables
- civilizations: curated historical civilizations (Indus, Vedic, Mauryan, etc.)
- dynasties: ruling dynasties with founder, capital, period
- personalities: historical figures with role, era, legacy
- events: historical events with year, category, confidence, summary
- evidence_sources: evidence linked to events (archaeology, inscriptions, etc.)
- collections: curated thematic groupings of events

3. Security
- RLS enabled on every table.
- All tables use `TO anon, authenticated` with `USING (true)` because the
  content is intentionally public/shared (no-auth app per spec).
*/

CREATE TABLE IF NOT EXISTS civilizations (
  id text PRIMARY KEY,
  name text NOT NULL,
  period text NOT NULL,
  description text NOT NULL,
  article_count integer NOT NULL DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS dynasties (
  id text PRIMARY KEY,
  name text NOT NULL,
  period text NOT NULL,
  founder text,
  capital text,
  civilization_id text REFERENCES civilizations(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS personalities (
  id text PRIMARY KEY,
  name text NOT NULL,
  role text,
  era text,
  legacy text,
  civilization_id text REFERENCES civilizations(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id text PRIMARY KEY,
  title text NOT NULL,
  year integer NOT NULL,
  category text NOT NULL,
  civilization_id text REFERENCES civilizations(id),
  confidence text NOT NULL DEFAULT 'likely',
  summary text NOT NULL,
  reading_time_min integer NOT NULL DEFAULT 5,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS evidence_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id text NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  evidence_type text NOT NULL,
  description text,
  source_title text,
  confidence text DEFAULT 'likely',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_ids text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_events_year ON events(year);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_civilization ON events(civilization_id);
CREATE INDEX IF NOT EXISTS idx_evidence_event ON evidence_sources(event_id);

-- Enable RLS on all tables
ALTER TABLE civilizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynasties ENABLE ROW LEVEL SECURITY;
ALTER TABLE personalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

-- Public read policies (no-auth app: content is intentionally shared)
DROP POLICY IF EXISTS "public_read_civilizations" ON civilizations;
CREATE POLICY "public_read_civilizations" ON civilizations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_dynasties" ON dynasties;
CREATE POLICY "public_read_dynasties" ON dynasties FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_personalities" ON personalities;
CREATE POLICY "public_read_personalities" ON personalities FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_events" ON events;
CREATE POLICY "public_read_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_evidence" ON evidence_sources;
CREATE POLICY "public_read_evidence" ON evidence_sources FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_collections" ON collections;
CREATE POLICY "public_read_collections" ON collections FOR SELECT
  TO anon, authenticated USING (true);

-- Public write for collections (anon can create curated collections)
DROP POLICY IF EXISTS "public_insert_collections" ON collections;
CREATE POLICY "public_insert_collections" ON collections FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_update_collections" ON collections;
CREATE POLICY "public_update_collections" ON collections FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public_delete_collections" ON collections;
CREATE POLICY "public_delete_collections" ON collections FOR DELETE
  TO anon, authenticated USING (true);
