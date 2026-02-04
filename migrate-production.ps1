$ErrorActionPreference = "Stop"

$PROJECT_ID = "cadservice-prod-2026"
$REGION = "us-central1"
$BACKEND_SERVICE = "cadservice-backend"
$DB_INSTANCE = "cadservice-db-v1"
$DB_CONNECTION = "${PROJECT_ID}:${REGION}:${DB_INSTANCE}"

Write-Host "🔄 Iniciando Migração de Banco de Dados de Produção..." -ForegroundColor Cyan

# 1. Configurar Projeto
gcloud config set project $PROJECT_ID

# 2. Definir Variáveis de Ambiente
$DATABASE_PROD = "postgresql://postgres:postgres123@127.0.0.1/cadservice_db?host=/cloudsql/$DB_CONNECTION"
$JWT_SECRET_PROD = "Cadservice2026_Secure_Key_v1"
$ENV_VARS = "NODE_ENV=production,GCP_PROJECT_ID=$PROJECT_ID,GCP_STORAGE_BUCKET=cadservice-uploads-prod,JWT_SECRET=$JWT_SECRET_PROD,DATABASE_URL=$DATABASE_PROD"

# 3. Criar/Atualizar o Job de Seed Admin (via SQL direto)
Write-Host "🛠️  Deploying Admin Seed Job (migrate-db-prod)..." -ForegroundColor Yellow
gcloud run jobs deploy migrate-db-prod `
    --image gcr.io/$PROJECT_ID/$BACKEND_SERVICE `
    --region $REGION `
    --set-env-vars $ENV_VARS `
    --set-cloudsql-instances $DB_CONNECTION `
    --command npx `
    --args "prisma,db,execute,--file,./prisma/seed_admin.sql"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Falha ao criar o job de migração."
}

# 4. Executar o Job
Write-Host "▶️  Executing Migration Job..." -ForegroundColor Yellow
gcloud run jobs execute migrate-db-prod --region $REGION --wait

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Migração Concluída com Sucesso!" -ForegroundColor Green
} else {
    Write-Error "Falha na execução da migração."
}
