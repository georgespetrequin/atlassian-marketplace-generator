-- Check if the marketplace_listings table exists, if not create it
CREATE TABLE IF NOT EXISTS marketplace_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  listingName TEXT,
  appName TEXT,
  appTagline TEXT,
  appLogo JSONB,
  appBanner JSONB,
  appYouTubeUrl TEXT,
  companyName TEXT,
  worksWithProducts JSONB,
  highlightTitle1 TEXT,
  highlightSummary1 TEXT,
  highlightScreenshot1 JSONB,
  highlightTitle2 TEXT,
  highlightSummary2 TEXT,
  highlightScreenshot2 JSONB,
  highlightTitle3 TEXT,
  highlightSummary3 TEXT,
  highlightScreenshot3 JSONB,
  moreDetails TEXT,
  videoUrl TEXT
);

-- If the table already exists but doesn't have a user_id column, add it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'marketplace_listings'
    AND column_name = 'user_id'
  ) THEN
    ALTER TABLE marketplace_listings ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS marketplace_listings_user_id_idx ON marketplace_listings(user_id);

-- Set up Row Level Security (RLS) to ensure users can only access their own data
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;

-- Create policies for different operations
-- Policy for users to select only their own listings
DROP POLICY IF EXISTS "Users can view their own listings" ON marketplace_listings;
CREATE POLICY "Users can view their own listings"
  ON marketplace_listings
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for users to insert their own listings
DROP POLICY IF EXISTS "Users can insert their own listings" ON marketplace_listings;
CREATE POLICY "Users can insert their own listings"
  ON marketplace_listings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own listings
DROP POLICY IF EXISTS "Users can update their own listings" ON marketplace_listings;
CREATE POLICY "Users can update their own listings"
  ON marketplace_listings
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy for users to delete their own listings
DROP POLICY IF EXISTS "Users can delete their own listings" ON marketplace_listings;
CREATE POLICY "Users can delete their own listings"
  ON marketplace_listings
  FOR DELETE
  USING (auth.uid() = user_id); 