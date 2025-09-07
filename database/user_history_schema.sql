-- User History table for storing user's formula and macro generation history
-- This table should be created in Supabase database

CREATE TABLE IF NOT EXISTS user_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    result_type VARCHAR(20) NOT NULL CHECK (result_type IN ('formula', 'macro', 'web_search')),
    result_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_history_user_id ON user_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_history_created_at ON user_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_history_result_type ON user_history(result_type);

-- Add RLS (Row Level Security) policies
ALTER TABLE user_history ENABLE ROW LEVEL SECURITY;

-- Users can only see their own history
CREATE POLICY "Users can view own history" ON user_history
    FOR SELECT USING (user_id = auth.uid());

-- Users can only insert their own history
CREATE POLICY "Users can insert own history" ON user_history
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can only update their own history
CREATE POLICY "Users can update own history" ON user_history
    FOR UPDATE USING (user_id = auth.uid());

-- Users can only delete their own history
CREATE POLICY "Users can delete own history" ON user_history
    FOR DELETE USING (user_id = auth.uid());

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_history_updated_at 
    BEFORE UPDATE ON user_history 
    FOR EACH ROW 
    EXECUTE PROCEDURE update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE user_history IS 'Stores user formula and macro generation history';
COMMENT ON COLUMN user_history.user_id IS 'Reference to the user who created this history item';
COMMENT ON COLUMN user_history.prompt IS 'The user prompt that generated the result';
COMMENT ON COLUMN user_history.result_type IS 'Type of result: formula, macro, or web_search';
COMMENT ON COLUMN user_history.result_data IS 'JSON data containing the generated result';
COMMENT ON COLUMN user_history.created_at IS 'When the history item was created';
COMMENT ON COLUMN user_history.updated_at IS 'When the history item was last updated';
