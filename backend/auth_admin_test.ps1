
$baseUrl = "http://localhost:8080"
$adminEmail = "admin@cadservice.com"
$adminPassword = "securePassword123"

# 1. Create Admin User (Seeding - skipping for now, assuming manual or existing, 
# strictly we should have a seed endpoint or use existing user. 
# For now, let's assume one exists or fail gracefully)
# Actually, let's try to login. If fail, well... we need to insert one.
# But we don't have a public register endpoint for admins.
# We can use a direct DB insert via Prisma CLI if needed, but let's try assuming the user might exist or we can't easily script pure DB insert without node.
# Let's try to login first.

Write-Host "1. Testing Login..."
$loginBody = @{
  email    = $adminEmail
  password = $adminPassword
} | ConvertTo-Json

try {
  $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
  $token = $loginResponse.access_token
  Write-Host "Login Success! Token received." -ForegroundColor Green
}
catch {
  Write-Host "Login Failed or User does not exist. Error: $_" -ForegroundColor Red
  # Maybe we should print the error detail
  Write-Host $_.Exception.Response.GetResponseStream()
  # Proceeding without token will fail next steps
  $token = $null
}

if ($token) {
  $headers = @{
    Authorization = "Bearer $token"
  }

  # 2. Test Protected Admin Route
  Write-Host "`n2. Testing Protected Admin Route (GET /api/admin/services)..."
  try {
    # Assuming /api/admin/services exists from previous context or generic admin route
    # If not, we might get 404, but if we get 401 it means auth failed.
    # Let's try /api/admin/v1/budget-requests as seen in context
    $response = Invoke-RestMethod -Uri "$baseUrl/api/admin/v1/budget-requests" -Method Get -Headers $headers
    Write-Host "Access Granted to Admin Route!" -ForegroundColor Green
  }
  catch {
    Write-Host "Access Denied to Admin Route. Error: $_" -ForegroundColor Red
    if ($_.Exception.Response.StatusCode -eq [System.Net.HttpStatusCode]::Unauthorized) {
      Write-Host "Status: Unauthorized (Expected if token invalid, but here token should be valid)" -ForegroundColor Red
    }
    elseif ($_.Exception.Response.StatusCode -eq [System.Net.HttpStatusCode]::Forbidden) {
      Write-Host "Status: Forbidden" -ForegroundColor Red
    }
  }

  # 3. Test Failure with Fake Token
  Write-Host "`n3. Testing With Invalid Token..."
  $badHeaders = @{
    Authorization = "Bearer badtoken123"
  }
  try {
    Invoke-RestMethod -Uri "$baseUrl/api/admin/v1/budget-requests" -Method Get -Headers $badHeaders
    Write-Host "Security Hole! Invalid token was accepted." -ForegroundColor Red
  }
  catch {
    if ($_.Exception.Response.StatusCode -eq [System.Net.HttpStatusCode]::Unauthorized) {
      Write-Host "Success: Invalid token rejected (401)." -ForegroundColor Green
    }
    else {
      Write-Host "Unexpected status: $($_.Exception.Response.StatusCode)" -ForegroundColor Yellow
    }
  }
}
