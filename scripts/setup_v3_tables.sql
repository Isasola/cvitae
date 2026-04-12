-- Table for dynamic system configuration
CREATE TABLE IF NOT EXISTS system_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initial configuration data
INSERT INTO system_config (key, value, description) VALUES
('promo_price_gs', '50000', 'Precio promocional del Plan Pro Plus en Guaraníes'),
('maintenance_mode', 'false', 'Activar/Desactivar modo mantenimiento'),
('landing_hero_h1', '¿Por qué no te llaman? Tu CV es invisible.', 'H1 principal de la landing'),
('landing_hero_sub', 'Los filtros automáticos (ATS) descartan tu perfil antes de que un humano lo vea. Corregilo en 60 segundos.', 'Subheadline de la landing'),
('recruiter_token_price_10', '100000', 'Precio de 10 tokens para reclutadores'),
('recruiter_token_price_100', '750000', 'Precio de 100 tokens para reclutadores')
ON CONFLICT (key) DO NOTHING;

-- Table for recruiter tokens and balances
CREATE TABLE IF NOT EXISTS recruiter_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id), -- Optional link to auth
    email TEXT UNIQUE NOT NULL,
    token_balance INTEGER DEFAULT 0,
    access_token TEXT UNIQUE NOT NULL, -- The 'REC-XXXX-YYYY' token
    plan_type TEXT DEFAULT 'starter', -- starter, pro, enterprise
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE system_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiter_tokens ENABLE ROW LEVEL SECURITY;

-- Policies for system_config: Read for everyone, Write for service role
CREATE POLICY "Allow public read for system_config" ON system_config FOR SELECT USING (true);

-- Policies for recruiter_tokens: Read for token owners (via access_token), Write for service role
CREATE POLICY "Allow read for recruiters via token" ON recruiter_tokens FOR SELECT USING (true);
