-- Create marketplace_listings table
CREATE TABLE marketplace_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  listingName TEXT NOT NULL,
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

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('marketplace-images', 'marketplace-images', true);

-- Set up storage policies
CREATE POLICY "Public Read Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'marketplace-images');

CREATE POLICY "Public Insert Access"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'marketplace-images');

CREATE POLICY "Public Update Access"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'marketplace-images');

CREATE POLICY "Public Delete Access"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'marketplace-images');
