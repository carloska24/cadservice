-- Fix for Schema Drift: Add ACTUALLY missing columns
-- The previous agent tried to add mimeType, sizeBytes, bucket which ALREADY exist
-- The REAL missing columns are: articleId (assets), coverImage/isPublished (articles), isActive (portfolio_projects)
-- 1. Add missing column to assets table (foreign key to articles)
ALTER TABLE "assets"
ADD COLUMN IF NOT EXISTS "articleId" TEXT;
-- 2. Add missing columns to articles table
ALTER TABLE "articles"
ADD COLUMN IF NOT EXISTS "coverImage" TEXT;
ALTER TABLE "articles"
ADD COLUMN IF NOT EXISTS "isPublished" BOOLEAN NOT NULL DEFAULT false;
-- 3. Add missing column to portfolio_projects table
ALTER TABLE "portfolio_projects"
ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;
-- 4. Add foreign key constraint for articleId -> articles
DO $$ BEGIN IF NOT EXISTS (
  SELECT 1
  FROM pg_constraint
  WHERE conname = 'assets_articleId_fkey'
) THEN
ALTER TABLE "assets"
ADD CONSTRAINT "assets_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
END IF;
END $$;
-- 5. Create index for isPublished, publishedAt on articles (required by schema)
CREATE INDEX IF NOT EXISTS "articles_isPublished_publishedAt_idx" ON "articles"("isPublished", "publishedAt");
-- 6. Create index for status, createdAt on budget_requests (required by schema)
CREATE INDEX IF NOT EXISTS "budget_requests_status_createdAt_idx" ON "budget_requests"("status", "createdAt");