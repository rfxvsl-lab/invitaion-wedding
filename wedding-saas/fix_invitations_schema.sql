/* 
   FIX INVITATIONS SCHEMA
   Resolves the "null value in column 'data' violates not-null constraint" error.
   This makes the legacy 'data' column optional and ensures 'content'/'metadata' exist.
*/

-- 1. Ensure the correct columns exist for the new logic
ALTER TABLE public.invitations ADD COLUMN IF NOT EXISTS content jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.invitations ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;

-- 2. Relax constraints on the legacy 'data' column
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invitations' AND column_name = 'data') THEN
        ALTER TABLE public.invitations ALTER COLUMN "data" DROP NOT NULL;
        ALTER TABLE public.invitations ALTER COLUMN "data" SET DEFAULT NULL;
    END IF;
END $$;
