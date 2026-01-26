# Test Budget Request Admin Module (PowerShell)

$BaseUrl = "http://localhost:8080/api"

Write-Host "--- 1. PUBLIC: Create Budget Request ---"
$createPayload = @{
  requesterName      = "Admin Test User";
  requesterEmail     = "admin.test@example.com";
  requesterPhone     = "+5511999999999"; 
  company            = "Test Corp";
  projectDescription = "Request for Admin Module Verification";
} | ConvertTo-Json

try {
  $request = Invoke-RestMethod -Method Post -Uri "$BaseUrl/public/v1/budget-requests" -Body $createPayload -ContentType "application/json"
  Write-Host "Created Request ID: $($request.id)"
  $RequestId = $request.id
}
catch {
  Write-Host "Error Creating Request: $_"
  exit
}

Write-Host "`n--- 2. ADMIN: List Requests ---"
try {
  $list = Invoke-RestMethod -Method Get -Uri "$BaseUrl/admin/v1/budget-requests?page=1&limit=5"
  Write-Host "Total Items: $($list.meta.total)"
  Write-Host "First Item Name: $($list.data[0].requesterName)"
}
catch {
  Write-Host "Error Listing Requests: $_"
}

Write-Host "`n--- 3. ADMIN: Get By ID ---"
try {
  $item = Invoke-RestMethod -Method Get -Uri "$BaseUrl/admin/v1/budget-requests/$RequestId"
  Write-Host "Fetched ID: $($item.id)"
  Write-Host "Current Status: $($item.status)"
}
catch {
  Write-Host "Error Fetching Request: $_"
}

Write-Host "`n--- 4. ADMIN: Update Status (PENDING -> REVIEWED) ---"
$updatePayload = @{
  status     = "REVIEWED";
  adminNotes = "Reviewed by Admin Script";
} | ConvertTo-Json

try {
  $updated = Invoke-RestMethod -Method Patch -Uri "$BaseUrl/admin/v1/budget-requests/$RequestId/status" -Body $updatePayload -ContentType "application/json"
  Write-Host "New Status: $($updated.status)"
  Write-Host "Admin Notes: $($updated.adminNotes)"
}
catch {
  Write-Host "Error Updating Status: $_"
}

Write-Host "`n--- 5. ADMIN: Verify Update ---"
try {
  $verify = Invoke-RestMethod -Method Get -Uri "$BaseUrl/admin/v1/budget-requests/$RequestId"
  if ($verify.status -eq "REVIEWED") {
    Write-Host "SUCCESS: Status verified as REVIEWED"
  }
  else {
    Write-Host "FAILURE: Status is $($verify.status)"
  }
}
catch {
  Write-Host "Error Verifying: $_"
}
