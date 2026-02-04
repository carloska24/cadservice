# deploy-fixed.ps1
$ErrorActionPreference = "Stop"

$PROJECT_ID = "cadservice-prod-2026"
$REGION = "us-central1"
$BACKEND_SERVICE = "cadservice-backend"
$FRONTEND_SERVICE = "cadservice-frontend"
$DB_INSTANCE = "cadservice-db-v1"
$DB_CONNECTION = "${PROJECT_ID}:${REGION}:${DB_INSTANCE}"

Write-Host "🚀 Iniciando Ciclo de Deploy FIXED (Correção PORT e Conectividade)..." -ForegroundColor Cyan

# 1. Configurar Projeto
gcloud config set project $PROJECT_ID

# 2. Obter URL do Backend
# (Para simplificar, usamos a URL esperada do serviço Cloud Run)
$BACKEND_URL = "https://$BACKEND_SERVICE-627913516280.$REGION.run.app"
Write-Host "📌 Backend URL: $BACKEND_URL" -ForegroundColor Green

# 3. BACKEND DEPLOY
Write-Host "📦 Implantando BACKEND..." -ForegroundColor Cyan
Set-Location backend

# Build Submitting
gcloud builds submit --tag gcr.io/$PROJECT_ID/$BACKEND_SERVICE .

# Configurar Variáveis de Ambiente (SEM PORT!)
# Nota: Usamos host=/cloudsql/... para Prisma Adapter com PG driver via Socket
$DATABASE_PROD = "postgresql://postgres:postgres123@localhost/cadservice_db?host=/cloudsql/$DB_CONNECTION"
$JWT_SECRET_PROD = "Cadservice2026_Secure_Key_v1"
# Ensure we DO NOT set PORT here. Cloud Run injects it.
$ENV_VARS = "NODE_ENV=production,GCP_PROJECT_ID=$PROJECT_ID,GCP_STORAGE_BUCKET=cadservice-uploads-prod,JWT_SECRET=$JWT_SECRET_PROD,DATABASE_URL=$DATABASE_PROD"

# 3.1 Migrations via Job
Write-Host "🔄 Migrations..." -ForegroundColor Yellow
gcloud run jobs deploy migrate-db-prod `
    --image gcr.io/$PROJECT_ID/$BACKEND_SERVICE `
    --platform managed `
    --region $REGION `
    --set-env-vars $ENV_VARS `
    --add-cloudsql-instances $DB_CONNECTION `
    --command npx `
    --args "prisma,migrate,deploy" `
    --quiet

gcloud run jobs execute migrate-db-prod --region $REGION --wait

# 3.2 Service Deploy
Write-Host "🚀 Deploy Service..." -ForegroundColor Cyan
gcloud run deploy $BACKEND_SERVICE `
    --image gcr.io/$PROJECT_ID/$BACKEND_SERVICE `
    --platform managed `
    --region $REGION `
    --allow-unauthenticated `
    --add-cloudsql-instances $DB_CONNECTION `
    --set-env-vars $ENV_VARS `
    --port 8080

Set-Location ..

# 4. FRONTEND DEPLOY
Write-Host "📦 Implantando FRONTEND..." -ForegroundColor Cyan
Set-Location frontend

# Variáveis de Build
$envContent = "NEXT_PUBLIC_API_URL=$BACKEND_URL"
Set-Content -Path ".env.production" -Value $envContent

gcloud builds submit --tag gcr.io/$PROJECT_ID/$FRONTEND_SERVICE .

gcloud run deploy $FRONTEND_SERVICE `
    --image gcr.io/$PROJECT_ID/$FRONTEND_SERVICE `
    --platform managed `
    --region $REGION `
    --allow-unauthenticated `
    --port 3000 
# Frontend NextJS often listens on 3000 inside container, cloud run maps it to 443 public

Set-Location ..

Write-Host "✅ DEPLOY CORRIGIDO CONCLUÍDO!" -ForegroundColor Green
