-- Seed Admin User for Production (UPSERT)
-- Password: Cadservice2026 (bcrypt hashed)
INSERT INTO "users" (
    "id",
    "email",
    "passwordHash",
    "fullName",
    "role",
    "createdAt",
    "updatedAt"
  )
VALUES (
    gen_random_uuid(),
    'carloska24@gmail.com',
    '$2b$10$eEKV04B/NkvnbZBpxVSKXOECVIGRkYMG7w.IToTMxxNCI7tLivtBS',
    'Carlos CADService',
    'ADMIN',
    NOW(),
    NOW()
  ) ON CONFLICT (email) DO
UPDATE
SET "passwordHash" = '$2b$10$eEKV04B/NkvnbZBpxVSKXOECVIGRkYMG7w.IToTMxxNCI7tLivtBS',
  "role" = 'ADMIN',
  "updatedAt" = NOW();