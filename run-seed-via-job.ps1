# run-seed-via-job.ps1
# Cria e executa um Cloud Run Job para inserir o admin via Prisma
$ErrorActionPreference = "Stop"

$PROJECT_ID = "cadservice-prod-2026"
$REGION = "us-central1"
$BACKEND_SERVICE = "cadservice-backend"
$DB_INSTANCE = "cadservice-db-v1"
$DB_CONNECTION = "${PROJECT_ID}:${REGION}:${DB_INSTANCE}"

Write-Host "🔄 Criando usuário Admin no Banco de Produção via Cloud Run Job..." -ForegroundColor Cyan

# 1. Configurar Projeto
gcloud config set project $PROJECT_ID

# 2. Definir Variáveis de Ambiente (mesmas do deploy)
$DATABASE_PROD = "postgresql://postgres:postgres123@localhost/cadservice_db?host=/cloudsql/$DB_CONNECTION"
$JWT_SECRET_PROD = "Cadservice2026_Secure_Key_v1"
$ENV_VARS = "NODE_ENV=production,GCP_PROJECT_ID=$PROJECT_ID,GCP_STORAGE_BUCKET=cadservice-uploads-prod,JWT_SECRET=$JWT_SECRET_PROD,DATABASE_URL=$DATABASE_PROD"

# 3. Criar/Atualizar o Job que executa o SQL via Prisma
Write-Host "🛠️  Deploying Seed Admin Job..." -ForegroundColor Yellow

# Usando prisma db execute para rodar o SQL diretamente
gcloud run jobs deploy seed-admin-job `
    --image gcr.io/$PROJECT_ID/$BACKEND_SERVICE `
    --region $REGION `
    --set-env-vars $ENV_VARS `
    --set-cloudsql-instances $DB_CONNECTION `
    --command npx `
    --args "prisma,db,execute,--file,./prisma/seed_admin.sql"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Falha ao criar o job."
    exit 1
}

# 4. Executar o Job
Write-Host "▶️  Executando Job de Seed..." -ForegroundColor Yellow
gcloud run jobs execute seed-admin-job --region $REGION --wait

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Usuário Admin Criado com Sucesso!" -ForegroundColor Green
    Write-Host "`n📋 Credenciais:" -ForegroundColor Cyan
    Write-Host "   Email: carloska24@gmail.com" -ForegroundColor White
    Write-Host "   Senha: Cadservice2026" -ForegroundColor White
    Write-Host "`n🔗 Teste em: https://cadservice-frontend-627913516280.us-central1.run.app/admin/login" -ForegroundColor Green
} else {
    Write-Error "Falha na execução do seed."
    
    # Mostrar logs do job para debug
    Write-Host "`n📜 Verificando logs do job..." -ForegroundColor Yellow
    gcloud run jobs executions list --job=seed-admin-job --region=$REGION --limit=1
}
