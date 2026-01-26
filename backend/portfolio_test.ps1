
$baseUrl = "http://localhost:8080"
$adminEmail = "admin@cadservice.com"
$adminPassword = "securePassword123"

# 1. Login to get Token
Write-Host "1. Authentication..."
$loginBody = @{ email = $adminEmail; password = $adminPassword } | ConvertTo-Json
try {
  $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
  $token = $loginResponse.access_token
  $headers = @{ Authorization = "Bearer $token" }
  Write-Host "Success! Token acquired." -ForegroundColor Green
}
catch {
  Write-Host "Login Failed. $_" -ForegroundColor Red
  exit
}

# 2. Create Portfolio Project (Admin)
Write-Host "`n2. Creating Project (Admin)..."
$projectSlug = "test-project-$(Get-Random)"
$projectBody = @{
  title = "Test Project"
  slug = $projectSlug
  description = "A test project description."
  serviceId = (Invoke-RestMethod "$baseUrl/api/public/v1/services").data[0].id # Get a valid service ID
  if (-not $serviceId) { Write-Host "Skipping Create: No Services found." -ForegroundColor Yellow; exit }
  isActive = $true
} | ConvertTo-Json

try {
  $project = Invoke-RestMethod -Uri "$baseUrl/api/admin/v1/projects" -Method Post -Body $projectBody -Headers $headers -ContentType "application/json"
  $projectId = $project.id
  Write-Host "Project Created. ID: $projectId" -ForegroundColor Green
}
catch {
  Write-Host "Create Failed. $_" -ForegroundColor Red
  # Continue to try listing? No, dependent.
  exit
}

# 3. Verify Public List (Should be Visible)
Write-Host "`n3. Verifying Public Visibility..."
$publicProjects = Invoke-RestMethod -Uri "$baseUrl/api/public/v1/projects"
if ($publicProjects.data | Where-Object { $_.id -eq $projectId }) {
  Write-Host "Success: Project visible in public list." -ForegroundColor Green
}
else {
  Write-Host "Failure: Project NOT found in public list." -ForegroundColor Red
}

# 4. Unpublish Project (Admin)
Write-Host "`n4. Unpublishing Project..."
$updateBody = @{ isActive = $false } | ConvertTo-Json
try {
  Invoke-RestMethod -Uri "$baseUrl/api/admin/v1/projects/$projectId" -Method Patch -Body $updateBody -Headers $headers -ContentType "application/json"
  Write-Host "Project Status Updated to Inactive." -ForegroundColor Green
}
catch {
  Write-Host "Update Failed. $_" -ForegroundColor Red
}

# 5. Verify Public List (Should NOT be Visible)
Write-Host "`n5. Verifying Public Hiding..."
$publicProjectsAfter = Invoke-RestMethod -Uri "$baseUrl/api/public/v1/projects"
if ($publicProjectsAfter.data | Where-Object { $_.id -eq $projectId }) {
  Write-Host "Failure: Inactive project STILL visible." -ForegroundColor Red
}
else {
  Write-Host "Success: Inactive project hidden from public list." -ForegroundColor Green
}

# 6. Verify Admin List (Should be Visible)
Write-Host "`n6. Verifying Admin List..."
$adminProjects = Invoke-RestMethod -Uri "$baseUrl/api/admin/v1/projects" -Headers $headers
if ($adminProjects.data | Where-Object { $_.id -eq $projectId }) {
  Write-Host "Success: Project visible to Admin." -ForegroundColor Green
}
else {
  Write-Host "Failure: Project NOT found in Admin list." -ForegroundColor Red
}

# 7. Cleanup
Write-Host "`n7. Cleaning up..."
try {
  Invoke-RestMethod -Uri "$baseUrl/api/admin/v1/projects/$projectId" -Method Delete -Headers $headers
  Write-Host "Project Deleted." -ForegroundColor Green
}
catch {
  Write-Host "Delete Failed. $_" -ForegroundColor Yellow
}
