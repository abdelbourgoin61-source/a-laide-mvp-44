-- ============================================
-- À l'aide - Database Schema (Supabase SQL)
-- ============================================
-- Version: MVP 1 Sprint 1
-- Date: 2026-02-11
-- 
-- Instructions:
-- 1. Créer projet Supabase sur database.new
-- 2. Copier ce fichier entier dans SQL Editor
-- 3. Exécuter (Run)
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS for geolocation
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('CLIENT', 'PROVIDER', 'ADMIN');
CREATE TYPE provider_status AS ENUM ('AVAILABLE', 'BUSY', 'OFFLINE');
CREATE TYPE mission_type AS ENUM ('URGENCY', 'PLANNED');
CREATE TYPE mission_status AS ENUM ('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE service_category AS ENUM ('EMERGENCY', 'HOME');

-- ============================================
-- TABLE: profiles (Extension de auth.users)
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'CLIENT' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read all profiles
CREATE POLICY "Profiles are viewable by everyone" 
  ON profiles FOR SELECT 
  USING (true);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- ============================================
-- TABLE: provider_profiles (Prestataires)
-- ============================================

CREATE TABLE provider_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Informations métier
  company_name TEXT,
  siret TEXT UNIQUE,
  bio TEXT,
  experience INTEGER, -- Années d'expérience
  
  -- Status & Disponibilité (CRITIQUE pour urgence)
  status provider_status DEFAULT 'OFFLINE' NOT NULL,
  
  -- Géolocalisation (CRITIQUE pour recherche proximity)
  location GEOGRAPHY(POINT),
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  
  -- Vérifications (KYC)
  is_verified BOOLEAN DEFAULT false NOT NULL,
  documents_verified BOOLEAN DEFAULT false NOT NULL,
  insurance_verified BOOLEAN DEFAULT false NOT NULL,
  
  -- Métriques
  rating DOUBLE PRECISION DEFAULT 0 NOT NULL CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0 NOT NULL,
  completed_missions INTEGER DEFAULT 0 NOT NULL,
  
  -- Tarification
  hourly_rate DOUBLE PRECISION,
  intervention_fee DOUBLE PRECISION, -- Frais déplacement
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index critiques pour performance
CREATE INDEX idx_provider_status ON provider_profiles(status);
CREATE INDEX idx_provider_location ON provider_profiles USING GIST(location); -- PostGIS
CREATE INDEX idx_provider_verified ON provider_profiles(is_verified);
CREATE INDEX idx_provider_rating ON provider_profiles(rating DESC);

-- RLS
ALTER TABLE provider_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view verified providers
CREATE POLICY "Verified providers are viewable by everyone" 
  ON provider_profiles FOR SELECT 
  USING (is_verified = true);

-- Policy: Providers can update their own profile
CREATE POLICY "Providers can update own profile" 
  ON provider_profiles FOR UPDATE 
  USING (auth.uid() = user_id);

-- ============================================
-- TABLE: services (Catégories)
-- ============================================

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  category service_category DEFAULT 'HOME' NOT NULL,
  description TEXT,
  
  -- Tarification indicative
  base_price DOUBLE PRECISION,
  price_min DOUBLE PRECISION,
  price_max DOUBLE PRECISION,
  
  -- SEO
  is_active BOOLEAN DEFAULT true NOT NULL,
  priority INTEGER DEFAULT 0 NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_services_slug ON services(slug);

-- RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policy: Services are viewable by everyone
CREATE POLICY "Services are viewable by everyone" 
  ON services FOR SELECT 
  USING (is_active = true);

-- ============================================
-- TABLE: provider_services (Many-to-Many)
-- ============================================

CREATE TABLE provider_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES provider_profiles(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  
  -- Tarif custom pour ce prestataire
  custom_price DOUBLE PRECISION,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  UNIQUE(provider_id, service_id)
);

-- Index
CREATE INDEX idx_provider_services_provider ON provider_services(provider_id);
CREATE INDEX idx_provider_services_service ON provider_services(service_id);

-- RLS
ALTER TABLE provider_services ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view provider services
CREATE POLICY "Provider services are viewable by everyone" 
  ON provider_services FOR SELECT 
  USING (true);

-- ============================================
-- TABLE: missions (Interventions) 🚨 CŒUR
-- ============================================

CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relations
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  
  -- Type & Status
  type mission_type DEFAULT 'URGENCY' NOT NULL,
  status mission_status DEFAULT 'PENDING' NOT NULL,
  
  -- Détails intervention
  description TEXT,
  
  -- Localisation intervention
  location GEOGRAPHY(POINT),
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  
  -- Planification
  scheduled_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Tarification (Commission 18%)
  price_estimate DOUBLE PRECISION,
  price_final DOUBLE PRECISION,
  commission DOUBLE PRECISION DEFAULT 18 NOT NULL, -- % commission
  
  -- Métadonnées
  notes TEXT,
  cancel_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index critiques
CREATE INDEX idx_missions_client ON missions(client_id);
CREATE INDEX idx_missions_provider ON missions(provider_id);
CREATE INDEX idx_missions_service ON missions(service_id);
CREATE INDEX idx_missions_status ON missions(status);
CREATE INDEX idx_missions_type ON missions(type);
CREATE INDEX idx_missions_created ON missions(created_at DESC);

-- RLS
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

-- Policy: Clients can view their own missions
CREATE POLICY "Clients can view own missions" 
  ON missions FOR SELECT 
  USING (auth.uid() = client_id);

-- Policy: Providers can view their assigned missions
CREATE POLICY "Providers can view assigned missions" 
  ON missions FOR SELECT 
  USING (auth.uid() = provider_id);

-- Policy: Clients can create missions
CREATE POLICY "Clients can create missions" 
  ON missions FOR INSERT 
  WITH CHECK (auth.uid() = client_id);

-- Policy: Providers can update their assigned missions
CREATE POLICY "Providers can update assigned missions" 
  ON missions FOR UPDATE 
  USING (auth.uid() = provider_id);

-- ============================================
-- TABLE: reviews (Avis)
-- ============================================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relations
  mission_id UUID UNIQUE NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Contenu avis
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  -- Modération
  is_published BOOLEAN DEFAULT true NOT NULL,
  is_flagged BOOLEAN DEFAULT false NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_published ON reviews(is_published);

-- RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Published reviews are viewable by everyone
CREATE POLICY "Published reviews are viewable by everyone" 
  ON reviews FOR SELECT 
  USING (is_published = true);

-- Policy: Users can create reviews for their missions
CREATE POLICY "Users can create reviews" 
  ON reviews FOR INSERT 
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM missions 
      WHERE id = mission_id 
        AND client_id = auth.uid() 
        AND status = 'COMPLETED'
    )
  );

-- ============================================
-- TABLE: call_logs (Analytics)
-- ============================================

CREATE TABLE call_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mission_id UUID REFERENCES missions(id) ON DELETE SET NULL,
  
  -- Métadonnées appel
  duration INTEGER, -- Durée en secondes
  source TEXT, -- "urgency", "search", "profile"
  
  called_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index
CREATE INDEX idx_call_logs_client ON call_logs(client_id);
CREATE INDEX idx_call_logs_provider ON call_logs(provider_id);
CREATE INDEX idx_call_logs_mission ON call_logs(mission_id);
CREATE INDEX idx_call_logs_date ON call_logs(called_at DESC);

-- RLS
ALTER TABLE call_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view call logs
CREATE POLICY "Only admins can view call logs" 
  ON call_logs FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function: Get nearby providers (PostGIS)
CREATE OR REPLACE FUNCTION get_nearby_providers(
  user_lat DOUBLE PRECISION,
  user_lng DOUBLE PRECISION,
  radius_km INTEGER DEFAULT 50,
  service_slug TEXT DEFAULT NULL
)
RETURNS TABLE (
  provider_id UUID,
  user_id UUID,
  company_name TEXT,
  rating DOUBLE PRECISION,
  review_count INTEGER,
  distance_km DOUBLE PRECISION,
  status provider_status
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pp.id AS provider_id,
    pp.user_id,
    pp.company_name,
    pp.rating,
    pp.review_count,
    ST_Distance(
      pp.location,
      ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography
    ) / 1000 AS distance_km,
    pp.status
  FROM provider_profiles pp
  WHERE 
    pp.is_verified = true
    AND pp.status = 'AVAILABLE'
    AND ST_DWithin(
      pp.location,
      ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
      radius_km * 1000
    )
    AND (
      service_slug IS NULL OR
      EXISTS (
        SELECT 1 FROM provider_services ps
        JOIN services s ON s.id = ps.service_id
        WHERE ps.provider_id = pp.id AND s.slug = service_slug
      )
    )
  ORDER BY distance_km ASC, pp.rating DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function: Calculate provider rating
CREATE OR REPLACE FUNCTION calculate_provider_rating(p_provider_id UUID)
RETURNS VOID AS $$
DECLARE
  avg_rating DOUBLE PRECISION;
  total_reviews INTEGER;
BEGIN
  SELECT 
    COALESCE(AVG(r.rating), 0),
    COUNT(*)
  INTO avg_rating, total_reviews
  FROM reviews r
  JOIN missions m ON m.id = r.mission_id
  WHERE m.provider_id = (
    SELECT user_id FROM provider_profiles WHERE id = p_provider_id
  )
  AND r.is_published = true;
  
  UPDATE provider_profiles
  SET 
    rating = avg_rating,
    review_count = total_reviews,
    updated_at = NOW()
  WHERE id = p_provider_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger: Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'CLIENT');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Trigger: Auto-update provider rating when review is created/updated
CREATE OR REPLACE FUNCTION update_provider_rating_on_review()
RETURNS TRIGGER AS $$
DECLARE
  p_provider_id UUID;
BEGIN
  SELECT pp.id INTO p_provider_id
  FROM missions m
  JOIN provider_profiles pp ON pp.user_id = m.provider_id
  WHERE m.id = NEW.mission_id;
  
  IF p_provider_id IS NOT NULL THEN
    PERFORM calculate_provider_rating(p_provider_id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_review_insert
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_provider_rating_on_review();

CREATE TRIGGER on_review_update
  AFTER UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_provider_rating_on_review();

-- Trigger: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_provider_profiles_updated_at BEFORE UPDATE ON provider_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_missions_updated_at BEFORE UPDATE ON missions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Database schema created successfully!';
  RAISE NOTICE '📊 Tables: profiles, provider_profiles, services, provider_services, missions, reviews, call_logs';
  RAISE NOTICE '🔐 RLS policies enabled';
  RAISE NOTICE '⚡ Functions: get_nearby_providers, calculate_provider_rating';
  RAISE NOTICE '🔔 Triggers: auto-create profile, auto-update rating';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Next step: Run seed.sql to populate data';
END $$;
src/lib/supabase.ts
