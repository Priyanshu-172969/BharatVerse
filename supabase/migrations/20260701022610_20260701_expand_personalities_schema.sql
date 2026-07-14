-- Expand personalities table with comprehensive fields
-- Identity
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS alternate_names TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Basic Information
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS birth_year INTEGER;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS death_year INTEGER;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS birth_text TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS death_text TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS age_at_death INTEGER;

-- Classification
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS categories TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS civilization TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS historical_period TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS dynasty TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS kingdom TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS religion TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS occupation TEXT[];

-- Geography
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS birthplace TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS death_place TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS region TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS present_state TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS present_country TEXT;

-- Biography
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS short_description TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS famous_for TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS achievements TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS notable_works TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS notable_titles TEXT[];

-- Timeline
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS active_start_year INTEGER;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS active_end_year INTEGER;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS century TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS timeline_order INTEGER;

-- Relationships
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS father TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS mother TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS spouse TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS children TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS teacher TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS students TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS predecessor TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS successor TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS contemporaries TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS related_people TEXT[];

-- Links to Other Tables
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS related_events TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS related_places TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS related_books TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS related_monuments TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS related_dynasties TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS related_kingdoms TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS related_artifacts TEXT[];

-- Media
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS gallery TEXT[];

-- External References
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS wikipedia_url TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS britannica_url TEXT;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS official_sources TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS "references" TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS citations TEXT[];

-- Search & SEO
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS keywords TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS search_aliases TEXT[];
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- Metadata
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT TRUE;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
ALTER TABLE personalities ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_personalities_slug ON personalities(slug);

-- Create index on name for search
CREATE INDEX IF NOT EXISTS idx_personalities_name ON personalities(name);

-- Create GIN indexes for array columns (useful for searching)
CREATE INDEX IF NOT EXISTS idx_personalities_categories ON personalities USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_personalities_keywords ON personalities USING GIN(keywords);