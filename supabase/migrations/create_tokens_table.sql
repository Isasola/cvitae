-- Create tokens table for recruiter access management
CREATE TABLE IF NOT EXISTS tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token VARCHAR(255) UNIQUE NOT NULL,
  recruiter_id VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Indexes for fast lookups
  CONSTRAINT tokens_unique_active UNIQUE (token, is_active)
);

-- Create index on token for fast verification
CREATE INDEX idx_tokens_token ON tokens(token);
CREATE INDEX idx_tokens_recruiter_id ON tokens(recruiter_id);
CREATE INDEX idx_tokens_expires_at ON tokens(expires_at);

-- Create function to auto-deactivate expired tokens
CREATE OR REPLACE FUNCTION deactivate_expired_tokens()
RETURNS void AS $$
BEGIN
  UPDATE tokens
  SET is_active = FALSE
  WHERE expires_at < NOW() AND is_active = TRUE;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON tokens TO authenticated;
GRANT SELECT ON tokens TO anon;
