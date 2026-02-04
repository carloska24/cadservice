-- Check if admin user exists
SELECT id,
  email,
  "fullName",
  role,
  "createdAt"
FROM "users"
WHERE email = 'carloska24@gmail.com';