# Script de Deploy Automatizado CADService - Google Cloud Platform
# Autor: AntiGravity (Google DeepMind)

Write-Host "🚀 Iniciando Deploy do CADService no Google Cloud..." -ForegroundColor Cyan

# 1. Configuração do Projeto
$projectId = Read-Host -Prompt "Digite o ID do seu Projeto Google Cloud (ex: cadservice-prod)"

if ([string]::IsNullOrWhiteSpace($projectId)) {
  Write-Host "❌ Project ID é obrigatório." -ForegroundColor Red
  exit 1
}

Write-Host "🔧 Configurando projeto: $projectId" -ForegroundColor Yellow
gcloud config set project $projectId

# 2. Habilitar APIs
Write-Host "🔌 Habilitando APIs necessárias (Cloud Run, Cloud Build, Artifact Registry)..." -ForegroundColor Yellow
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

# 3. Backend Deploy
Write-Host "📦 Iniciando Build & Deploy do Backend (NestJS)..." -ForegroundColor Yellow
Write-Host "   Isso pode levar alguns minutos..." -ForegroundColor Gray

# Submete o build para o Cloud Build (Cria a imagem Docker na nuvem)
gcloud builds submit --tag gcr.io/$projectId/cadservice-backend backend/

if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Falha no Build do Backend." -ForegroundColor Red
  exit 1
}

# Deploy no Cloud Run (Port 3000 é padrão do container, mas Cloud Run injeta PORT env var, nosso Dockerfile deve respeitar ou expor 3000)
# Ajustando Dockerfile Backend se necessário para usar porta correta ou var de ambiente
gcloud run deploy cadservice-backend `
  --image gcr.io/$projectId/cadservice-backend `
  --platform managed `
  --region us-central1 `
  --allow-unauthenticated `
  --port 3000

if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Falha no Deploy do Backend." -ForegroundColor Red
  exit 1
}

# Pegar URL do Backend
$backendUrl = gcloud run services describe cadservice-backend --platform managed --region us-central1 --format 'value(status.url)'
Write-Host "✅ Backend Deployed em: $backendUrl" -ForegroundColor Green

# 4. Frontend Deploy
Write-Host "🎨 Iniciando Build & Deploy do Frontend (Next.js)..." -ForegroundColor Yellow
Write-Host "   Configurando NEXT_PUBLIC_API_URL=$backendUrl" -ForegroundColor Gray

# Gerar .env.production para o build time (Necessário para variáveis NEXT_PUBLIC_)
$envContent = "NEXT_PUBLIC_API_URL=$backendUrl"
Set-Content -Path "frontend/.env.production" -Value $envContent
Write-Host "   Arquivo frontend/.env.production criado com sucesso." -ForegroundColor Gray

gcloud builds submit --tag gcr.io/$projectId/cadservice-frontend frontend/

if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Falha no Build do Frontend." -ForegroundColor Red
  exit 1
}

gcloud run deploy cadservice-frontend `
  --image gcr.io/$projectId/cadservice-frontend `
  --platform managed `
  --region us-central1 `
  --allow-unauthenticated `
  --port 3000 `
  --set-env-vars NEXT_PUBLIC_API_URL=$backendUrl

if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Falha no Deploy do Frontend." -ForegroundColor Red
  exit 1
}

$frontendUrl = gcloud run services describe cadservice-frontend --platform managed --region us-central1 --format 'value(status.url)'
Write-Host "🎉 DEPLOY CONCLUÍDO!" -ForegroundColor Green
Write-Host "Frontend: $frontendUrl" -ForegroundColor Green
Write-Host "Backend: $backendUrl" -ForegroundColor Green
