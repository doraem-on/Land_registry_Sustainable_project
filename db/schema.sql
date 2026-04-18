-- ==========================================
-- GDLR: GLOBAL DIGITAL LAND REGISTRY SCHEMA
-- Architecture: 3NF Normalized with Spatial Extensions
-- ==========================================

-- 1. Enable Professional Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Land Parcel Table (1NF/2NF/3NF)
-- Stores physical geometry using PostGIS
CREATE TABLE LAND_PARCEL (
    parcel_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    geo_boundary GEOMETRY(Polygon, 4326) NOT NULL,
    area_sqm NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Water Quota Table (Resource Normalization)
-- Enforces a check constraint to prevent over-extraction (Business Logic at DB level)
CREATE TABLE WATER_QUOTA (
    quota_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parcel_id UUID REFERENCES LAND_PARCEL(parcel_id) UNIQUE,
    season_year INT NOT NULL,
    gallons_remaining NUMERIC(12,2) CHECK (gallons_remaining >= 0),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Renewable Energy Assets (Sustainable Layer)
CREATE TABLE RENEWABLE_ASSETS (
    asset_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parcel_id UUID REFERENCES LAND_PARCEL(parcel_id),
    asset_type VARCHAR(50), -- 'SOLAR' or 'WIND'
    carbon_credits_available NUMERIC(12,2) DEFAULT 0.00
);

-- 5. Audit Log Table (Immutable Ledger)
-- Essential for Government-grade registries to prevent fraud
CREATE TABLE AUDIT_LOG (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parcel_id UUID REFERENCES LAND_PARCEL(parcel_id),
    action_type VARCHAR(100),
    old_value JSONB,
    new_value JSONB,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- SEED DATA (Initial Test Environment)
-- ==========================================

-- Insert Solar Hub A (Square Polygon)
INSERT INTO LAND_PARCEL (parcel_id, geo_boundary, area_sqm)
VALUES (
    '381cb099-0ba9-43ca-acda-a2e1b5828790', 
    ST_GeomFromText('POLYGON((0 0, 0 0.0001, 0.0001 0.0001, 0.0001 0, 0 0))', 4326),
    100.00
);

-- Insert Residential Parcel B (Adjacent to Solar Hub)
INSERT INTO LAND_PARCEL (parcel_id, geo_boundary, area_sqm)
VALUES (
    '9be4a7da-bad8-4f53-820e-88a35820f4a0', 
    ST_GeomFromText('POLYGON((0 0.0001, 0 0.0002, 0.0001 0.0002, 0.0001 0.0001, 0 0.0001))', 4326),
    100.00
);

-- Seed Water Quotas for 2026
INSERT INTO WATER_QUOTA (parcel_id, season_year, gallons_remaining)
VALUES ('381cb099-0ba9-43ca-acda-a2e1b5828790', 2026, 50000.00);

INSERT INTO WATER_QUOTA (parcel_id, season_year, gallons_remaining)
VALUES ('9be4a7da-bad8-4f53-820e-88a35820f4a0', 2026, 10000.00);