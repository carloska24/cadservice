# deploy.ps1 v4.2 - Script de Estabilidade Garantida
$PROJECT_ID = "cadservice-prod-2026"
$REGION = "us-central1"
$BACKEND_SERVICE = "cadservice-backend"
$FRONTEND_SERVICE = "cadservice-frontend"

Write-Host "🚀 Iniciando Ciclo de Deploy v4.2 (Garantia de Identidade)..." -ForegroundColor Cyan

# 1. Validar Identidade do Projeto
gcloud config set project $PROJECT_ID
if ($LASTEXITCODE -ne 0) { throw "Falha ao definir projeto GCP" }

# 2. Obter URL do Backend (Sincronização)
Write-Host "🔍 Sincronizando endpoint do backend..." -ForegroundColor Yellow
$BACKEND_URL = "https://cadservice-backend-627913516280.us-central1.run.app"
Write-Host "📌 Backend URL: $BACKEND_URL" -ForegroundColor Green

# 3. BUILD & DEPLOY BACKEND
Write-Host "📦 Implantando BACKEND..." -ForegroundColor Cyan
Set-Location backend

# Build no Cloud Build
gcloud builds submit --tag gcr.io/$PROJECT_ID/$BACKEND_SERVICE .
if ($LASTEXITCODE -ne 0) { throw "Falha no build do Backend" }

# Deploy Cloud Run (Sincronizado v5.0)
$DATABASE_PROD = "postgresql://postgres:postgres123@/cadservice_db?host=/cloudsql/$PROJECT_ID:us-central1:cadservice-db-v1"
$JWT_SECRET_PROD = "Cadservice2026_Secure_Key_v1"
$ENV_VARS = "NODE_ENV=production,GCP_PROJECT_ID=$PROJECT_ID,GCP_STORAGE_BUCKET=cadservice-uploads-prod,JWT_SECRET=$JWT_SECRET_PROD,DATABASE_URL=$DATABASE_PROD"


# 2.1 Garantir Banco de Dados (Emergency Fix)
Write-Host "🗄️ Verificando banco de dados Cloud SQL..." -ForegroundColor Yellow
gcloud sql databases create cadservice_db --instance=cadservice-db-v1 --project=$PROJECT_ID --quiet 2>$null
if ($LASTEXITCODE -eq 0) { Write-Host "✅ Banco 'cadservice_db' criado." -ForegroundColor Green }
else { Write-Host "ℹ️ Banco 'cadservice_db' já existe ou erro ignorável." -ForegroundColor Gray }

# 2.2 Executar Migrations via Cloud Run Job (Schema Fix)
Write-Host "🔄 Executando Migrations (Cloud Run Job)..." -ForegroundColor Yellow

# Job Creation (Single Line for Safety)
$JOB_ARGS = "prisma,migrate,deploy"
gcloud run jobs deploy migrate-db-prod --image gcr.io/$PROJECT_ID/$BACKEND_SERVICE --platform managed --region $REGION --set-env-vars $ENV_VARS --add-cloudsql-instances "$PROJECT_ID:us-central1:cadservice-db-v1" --command npx --args $JOB_ARGS --quiet

if ($LASTEXITCODE -eq 0) {
    Write-Host "🚀 Disparando Job de Migração..." -ForegroundColor Cyan
    gcloud run jobs execute migrate-db-prod --region $REGION --wait
} else {
    Write-Host "⚠️ Falha ao configurar Job de Migração. Verifique logs." -ForegroundColor Red
}

# Deploy Cloud Run (Sincronizado v5.0 - Single Line)
gcloud run deploy $BACKEND_SERVICE --image gcr.io/$PROJECT_ID/$BACKEND_SERVICE --platform managed --region $REGION --allow-unauthenticated --add-cloudsql-instances "$PROJECT_ID:us-central1:cadservice-db-v1" --set-env-vars $ENV_VARS
if ($LASTEXITCODE -ne 0) { throw "Falha no deploy do Backend" }

Set-Location ..

# 4. PREPARAR & DEPLOY FRONTEND
Write-Host "📦 Implantando FRONTEND..." -ForegroundColor Cyan
Set-Location frontend

# Injetar URL para o build-time do Next.js
$envContent = "NEXT_PUBLIC_API_URL=$BACKEND_URL"
Set-Content -Path ".env.production" -Value $envContent
Write-Host "✅ Variáveis de build injetadas: $BACKEND_URL" -ForegroundColor Gray

# Build e Deploy Frontend
gcloud builds submit --tag gcr.io/$PROJECT_ID/$FRONTEND_SERVICE .
if ($LASTEXITCODE -ne 0) { throw "Falha no build do Frontend" }

gcloud run deploy $FRONTEND_SERVICE --image gcr.io/$PROJECT_ID/$FRONTEND_SERVICE --platform managed --region $REGION --allow-unauthenticated
if ($LASTEXITCODE -ne 0) { throw "Falha no deploy do Frontend" }

Set-Location ..

Write-Host "`n🎉 DEPLOY v4.2 FINALIZADO COM SUCESSO!" -ForegroundColor Green
Write-Host "--------------------------------------------------" -ForegroundColor Gray
Write-Host "🌐 Site Oficial: $(gcloud run services describe $FRONTEND_SERVICE --platform managed --region $REGION --format 'value(status.url)')" -ForegroundColor Green
Write-Host "⚙️  API Endpoint: $BACKEND_URL" -ForegroundColor Green
Write-Host "--------------------------------------------------" -ForegroundColor Gray
