-- Initial schema for AI Archives application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Conversation metadata
    model VARCHAR(50) NOT NULL,
    scraped_at TIMESTAMP WITH TIME ZONE NOT NULL,
    content_key VARCHAR(255) NOT NULL,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT positive_source_html_bytes CHECK (source_html_bytes > 0),
    CONSTRAINT non_negative_views CHECK (views >= 0)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_conversations_model ON conversations(model);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language "plpgsql";

CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 