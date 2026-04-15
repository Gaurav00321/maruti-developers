-- ═══════════════════════════════════════════════════════════
-- MARUTI DEVELOPERS — Supabase Database Schema
-- Run this in Supabase SQL Editor (supabase.com/dashboard → SQL)
-- ═══════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════
-- LEADS TABLE
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS leads (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  name            TEXT NOT NULL,
  whatsapp        TEXT NOT NULL,
  email           TEXT,
  industry        TEXT,
  preferred_state TEXT,
  budget          TEXT,
  message         TEXT,
  source          TEXT DEFAULT 'website', -- popup | contact | hero | footer | property
  status          TEXT DEFAULT 'new',     -- new | contacted | qualified | site_visit | closed | lost
  notes           TEXT,
  assigned_to     TEXT,
  last_contact    TIMESTAMPTZ,
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  utm_content     TEXT,
  ip_address      TEXT,
  user_agent      TEXT,
  referrer        TEXT
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert leads" ON leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Authenticated can read all leads" ON leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can update leads" ON leads FOR UPDATE TO authenticated USING (true);

-- ═══════════════════════════════════════
-- PROPERTIES TABLE
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS properties (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  
  -- Basic Info
  title               TEXT NOT NULL,
  slug                TEXT UNIQUE NOT NULL,
  description         TEXT,
  
  -- Classification
  type                TEXT NOT NULL CHECK (type IN ('industrial_land','warehouse','commercial','shed','agricultural','office')),
  transaction         TEXT NOT NULL CHECK (transaction IN ('sale','lease','rent')),
  
  -- Location
  state               TEXT NOT NULL,
  city                TEXT NOT NULL,
  area_name           TEXT,
  address             TEXT,
  pincode             TEXT,
  latitude            DECIMAL(10,7),
  longitude           DECIMAL(10,7),
  
  -- Size
  size_sqft           BIGINT,
  size_acres          DECIMAL(10,4),
  built_up_area       BIGINT,
  
  -- Pricing
  price               BIGINT,
  price_per_sqft      BIGINT,
  rent_per_month      BIGINT,
  lease_per_year      BIGINT,
  price_negotiable    BOOLEAN DEFAULT false,
  price_on_request    BOOLEAN DEFAULT false,
  
  -- Industrial Details
  estate_name         TEXT,
  zone_type           TEXT,
  pollution_cat       TEXT CHECK (pollution_cat IN ('red','orange','green','NA')),
  nic_code            TEXT,
  
  -- Infrastructure
  road_width          DECIMAL(6,1),
  power_available     DECIMAL(8,2),
  water_available     BOOLEAN DEFAULT false,
  railway_siding      BOOLEAN DEFAULT false,
  covered_shed        BOOLEAN DEFAULT false,
  office_space        BOOLEAN DEFAULT false,
  
  -- Distances (km)
  highway_distance    DECIMAL(6,1),
  port_distance       DECIMAL(6,1),
  airport_distance    DECIMAL(6,1),
  railway_distance    DECIMAL(6,1),
  
  -- Media
  images              JSONB DEFAULT '[]',
  documents           JSONB DEFAULT '[]',
  features            JSONB DEFAULT '[]',
  video_url           TEXT,
  
  -- Status & Meta
  status              TEXT DEFAULT 'active' CHECK (status IN ('active','sold','leased','draft','pending')),
  featured            BOOLEAN DEFAULT false,
  verified            BOOLEAN DEFAULT false,
  view_count          INTEGER DEFAULT 0,
  inquiry_count       INTEGER DEFAULT 0,
  
  -- Legal
  rera_number         TEXT,
  title_clear         BOOLEAN DEFAULT false,
  owner_type          TEXT CHECK (owner_type IN ('direct','sub-broker','owner')),
  
  -- SEO
  meta_title          TEXT,
  meta_description    TEXT,
  keywords            TEXT[]
);

CREATE INDEX ON properties(state);
CREATE INDEX ON properties(city);
CREATE INDEX ON properties(type);
CREATE INDEX ON properties(transaction);
CREATE INDEX ON properties(status);
CREATE INDEX ON properties(featured);
CREATE INDEX ON properties(price);
CREATE INDEX ON properties(size_sqft);

CREATE TRIGGER properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active properties" ON properties FOR SELECT TO anon 
  USING (status = 'active');
CREATE POLICY "Authenticated can manage properties" ON properties FOR ALL TO authenticated 
  USING (true);

-- ═══════════════════════════════════════
-- BLOG POSTS TABLE
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS blog_posts (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  published_at      TIMESTAMPTZ,
  
  title             TEXT NOT NULL,
  slug              TEXT UNIQUE NOT NULL,
  excerpt           TEXT,
  content           TEXT,
  cover_image       TEXT,
  cover_image_alt   TEXT,
  
  author_name       TEXT DEFAULT 'Vinod Jaiswal',
  author_image      TEXT,
  author_title      TEXT DEFAULT 'Industrial Land Developer & Real Estate Advisor',
  
  tags              TEXT[] DEFAULT '{}',
  category          TEXT,
  
  status            TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  featured          BOOLEAN DEFAULT false,
  view_count        INTEGER DEFAULT 0,
  read_time         INTEGER DEFAULT 5,
  
  meta_title        TEXT,
  meta_description  TEXT,
  canonical_url     TEXT
);

CREATE TRIGGER blog_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published posts" ON blog_posts FOR SELECT TO anon 
  USING (status = 'published');
CREATE POLICY "Authenticated can manage blog" ON blog_posts FOR ALL TO authenticated 
  USING (true);

-- ═══════════════════════════════════════
-- SITE SETTINGS TABLE
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS settings (
  key           TEXT PRIMARY KEY,
  value         TEXT,
  description   TEXT,
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO settings (key, value, description) VALUES
  ('whatsapp_number', '919898610678', 'Primary WhatsApp number'),
  ('whatsapp_number_2', '917878610678', 'Secondary WhatsApp number'),
  ('admin_email', 'marutideveloper78@gmail.com', 'Admin notification email'),
  ('popup_delay_ms', '30000', 'Popup trigger delay in ms'),
  ('popup_cooldown_days', '7', 'Days before popup shows again'),
  ('featured_properties_count', '4', 'Number of featured properties on homepage'),
  ('site_announcement', '', 'Optional announcement banner text'),
  ('meta_description', 'Maruti Developers — Industrial Land, Warehouses & Commercial Property across India. 25+ years experience, 2500+ clients. RERA-compliant, white-money transactions only.', 'Default site meta description')
ON CONFLICT (key) DO NOTHING;

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read settings" ON settings FOR SELECT TO anon USING (true);
CREATE POLICY "Authenticated can manage settings" ON settings FOR ALL TO authenticated USING (true);

-- ═══════════════════════════════════════
-- PROPERTY INQUIRIES (linked to leads)
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS property_inquiries (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  lead_id       UUID REFERENCES leads(id),
  property_id   UUID REFERENCES properties(id),
  message       TEXT
);

ALTER TABLE property_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert inquiry" ON property_inquiries FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Authenticated can view inquiries" ON property_inquiries FOR SELECT TO authenticated USING (true);

-- ═══════════════════════════════════════
-- STORAGE BUCKETS
-- ═══════════════════════════════════════
-- Run in Supabase Storage → Create bucket:
-- 1. "property-images" (public: true)
-- 2. "blog-images" (public: true)  
-- 3. "property-documents" (public: false)
-- 4. "avatars" (public: true)
