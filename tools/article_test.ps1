
$baseUrl = "http://localhost:8080"
$adminEmail = "admin@cadservice.com"
$adminPassword = "securePassword123"

# 1. Login
Write-Host "1. Authentication..."
$loginBody = @{ email = $adminEmail; password = $adminPassword } | ConvertTo-Json
$token = (Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginBody -ContentType "application/json").access_token
$headers = @{ Authorization = "Bearer $token" }

# 2. Get Author ID (Admin)
$admin = (Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginBody -ContentType "application/json") # Hack to assume admin is first user or known
# Actually we need authorId for Article. Schema says:
# authorId    String
# author      User      @relation(fields: [authorId], references: [id])
# We can use the decoded token user id or fetch profiling.
# Let's decode or reuse known seeding info.
# In login response we might have user info?
# AuthService.login returns { access_token }.
# We need an ID.
# Let's use Prisma to find one or guess.
# Actually, we can fetch /api/admin/v1/projects if author info is exposed? No.
# We can fetch /auth/profile if it exists? No.
# Let's try to assume we can get it from a seeded admin script or just "any" existing ID if we can list users.
# We don't have list users endpoint potentially exposed to scripts easily without implementing it.
# BUT, we have `seed_admin.ts` which created `admin@cadservice.com`.
# We unfortunately don't have the ID unless we query it.
# Let's create a Helper Route or assume we can pass any valid UUID if we had one.
# BETTER: Use `UsersService` to findByEmail in the Controller?
# No, Article Create DTO expects `authorId`.
# Wait, `AdminArticleController.create` takes `ArticleCreateInput`.
# We must provide `author: { connect: { email: ... } }` if Prisma allows, or `authorId`.
# `ArticleCreateInput` allows `author: UserCreateNestedOneWithoutArticlesInput`.
# So we can use `connect: { email: 'admin@cadservice.com' }`. This is safer!

Write-Host "2. Creating Unpublished Article..."
$articleSlug = "test-article-$(Get-Random)"
$articleBody = @{
  title       = "Test Article"
  slug        = $articleSlug
  excerpt     = "Short summary"
  content     = "Full content"
  isPublished = $false
  author      = @{
    connect = @{ email = $adminEmail }
  }
} | ConvertTo-Json -Depth 3

try {
  $article = Invoke-RestMethod -Uri "$baseUrl/api/admin/v1/articles" -Method Post -Body $articleBody -Headers $headers -ContentType "application/json"
  $articleId = $article.id
  Write-Host "Article Created. ID: $articleId" -ForegroundColor Green
}
catch {
  Write-Host "Create Failed. $_" -ForegroundColor Red
  exit
}

# 3. Verify NOT Public
Write-Host "`n3. Verifying Public Visibility (Should be Hidden)..."
try {
  Invoke-RestMethod -Uri "$baseUrl/api/public/v1/articles/$articleSlug"
  Write-Host "Failure: Unpublished article is visible!" -ForegroundColor Red
}
catch {
  if ($_.Exception.Response.StatusCode -eq [System.Net.HttpStatusCode]::NotFound) {
    Write-Host "Success: Unpublished article is 404 (Hidden)." -ForegroundColor Green
  }
  else {
    Write-Host "Unexpected Error: $_" -ForegroundColor Yellow
  }
}

# 4. Publish Article
Write-Host "`n4. Publishing Article..."
$updateBody = @{ isPublished = $true; publishedAt = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ") } | ConvertTo-Json
Invoke-RestMethod -Uri "$baseUrl/api/admin/v1/articles/$articleId" -Method Patch -Body $updateBody -Headers $headers -ContentType "application/json"
Write-Host "Article Published." -ForegroundColor Green

# 5. Verify Public
Write-Host "`n5. Verifying Public Visibility (Should be Visible)..."
try {
  $publicArticle = Invoke-RestMethod -Uri "$baseUrl/api/public/v1/articles/$articleSlug"
  if ($publicArticle.id -eq $articleId) {
    Write-Host "Success: Article is now visible." -ForegroundColor Green
  }
}
catch {
  Write-Host "Failure: Article still hidden. $_" -ForegroundColor Red
}

# 6. Cleanup
Write-Host "`n6. Cleanup..."
Invoke-RestMethod -Uri "$baseUrl/api/admin/v1/articles/$articleId" -Method Delete -Headers $headers
Write-Host "Article Deleted."
