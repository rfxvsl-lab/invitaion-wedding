-- Add Luxury Pink theme to database (fixed schema)
INSERT INTO themes (name, slug, tier, thumbnail_url, preview_url)
VALUES (
  'Luxury Pink',
  'luxury-pink',
  'exclusive',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80',
  '/preview/luxury-pink'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tier = EXCLUDED.tier,
  thumbnail_url = EXCLUDED.thumbnail_url,
  preview_url = EXCLUDED.preview_url;
