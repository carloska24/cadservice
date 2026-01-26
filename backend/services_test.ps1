# Test Services Module (PowerShell)

$BaseUrl = "http://localhost:8080/api"

Write-Host "--- 1. ADMIN: Create Service ---"
$createPayload = @{
    name = "Usinagem CNC de Precisão";
    slug = "usinagem-cnc-precisao";
    description = "Serviço de alta precisão para peças complexas.";
    category = "Usinagem";
    technical_specs = @{ tolerance = "0.01mm"; material = "Steel" };
    is_active = $true
} | ConvertTo-Json -Depth 5

$service = Invoke-RestMethod -Method Post -Uri "$BaseUrl/admin/v1/services" -Body $createPayload -ContentType "application/json"
Write-Host "Created Service ID: $($service.id)"
$ServiceId = $service.id

Write-Host "`n--- 2. PUBLIC: List Services ---"
$list = Invoke-RestMethod -Method Get -Uri "$BaseUrl/public/v1/services"
Write-Host "Count: $($list.Count)"
Write-Host "First Item: $($list[0].title)"

Write-Host "`n--- 3. PUBLIC: Get by Slug ---"
$slugItem = Invoke-RestMethod -Method Get -Uri "$BaseUrl/public/v1/services/usinagem-cnc-precisao"
Write-Host "Found: $($slugItem.title)"

Write-Host "`n--- 4. ADMIN: Update Service ---"
$updatePayload = @{
    name = "Usinagem CNC Ultra Precisão";
    description = "Atualizado: Agora com 5 eixos."
} | ConvertTo-Json

$updated = Invoke-RestMethod -Method Put -Uri "$BaseUrl/admin/v1/services/$ServiceId" -Body $updatePayload -ContentType "application/json"
Write-Host "Updated Title: $($updated.title)"

Write-Host "`n--- 5. ADMIN: Deactivate ---"
$deactivated = Invoke-RestMethod -Method Patch -Uri "$BaseUrl/admin/v1/services/$ServiceId/deactivate" -Body "{}" -ContentType "application/json"
Write-Host "Active Status: $($deactivated.isActive)"

Write-Host "`n--- 6. PUBLIC: Verify Deactivation (Should be empty list or not found) ---"
# Slug fetch might 404 now depending on logic
try {
    $check = Invoke-RestMethod -Method Get -Uri "$BaseUrl/public/v1/services/usinagem-cnc-precisao"
    Write-Host "Still found (Unexpected if filter works)"
} catch {
    Write-Host "Correctly Not Found (404)"
}
