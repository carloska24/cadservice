# Manual API Tests - BudgetRequest Module

Scripts curl para validar o fluxo de Solicitação de Orçamento.

## Pré-requisitos

- Backend rodando em `http://localhost:8080`
- Caso esteja no Windows (PowerShell), use `curl.exe` ou Git Bash.
- Para funcionar o Signed URL, o arquivo definido em `GOOGLE_APPLICATION_CREDENTIALS` deve existir e ser válido (ou estar logado via `gcloud auth application-default login`).

---

## 1. Gerar Signed URL (Upload)

Simula a etapa onde o Frontend pede permissão para enviar o arquivo.

```bash
curl -X POST http://localhost:8080/api/public/v1/budget-requests/upload-url \
  -H "Content-Type: application/json" \
  -d "{\"filename\": \"especificacao-tecnica.pdf\", \"contentType\": \"application/pdf\"}"
```

**Resposta esperada (201 Created):**

```json
{
  "uploadUrl": "https://storage.googleapis.com/...",
  "publicUrl": "https://storage.googleapis.com/..."
}
```

---

## 2. Fazer Upload do Arquivo (Simulação)

Use a `uploadUrl` recebida no passo anterior.
_Nota: Crie um arquivo dummy `dummy.pdf` ou ajuste os caminhos._

```bash
# Crie um arquivo dummy se não tiver (Linux/Mac/GitBash)
echo "Conteudo PDF" > dummy.pdf

# Upload direto para o GCS
curl -X PUT -H "Content-Type: application/pdf" \
  --upload-file dummy.pdf \
  "<COLE_AQU_A_UPLOAD_URL_MUITO_LONGA>"
```

---

## 3. Criar a Solicitação de Orçamento

Envia os dados do formulário para o backend.

```bash
curl -X POST http://localhost:8080/api/public/v1/budget-requests \
  -H "Content-Type: application/json" \
  -d "{
    \"requesterName\": \"Engenheiro Teste\",
    \"requesterEmail\": \"engenharia@cliente-industrial.com\",
    \"requesterPhone\": \"+5511999998888\",
    \"company\": \"Metalúrgica ABC Ltda\",
    \"projectDescription\": \"Solicito cotação para usinagem de 50 peças conforme anexo (upload já realizado).\"
  }"
```

**Resposta esperada (201 Created):**

```json
{
  "id": "uuid-gerado...",
  "requesterName": "Engenheiro Teste",
  "status": "PENDING",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Versão PowerShell (Windows Nnativo)

Se estiver usando PowerShell puro, a sintaxe de JSON muda ligeiramente:

**1. Gerar URL**

```powershell
$body = @{
    filename = "teste.pdf"
    contentType = "application/pdf"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:8080/api/public/v1/budget-requests/upload-url" -Body $body -ContentType "application/json"
```

**2. Criar Orçamento**

```powershell
$body = @{
    requesterName = "Teste Windows"
    requesterEmail = "win@teste.com"
    projectDescription = "Teste via PowerShell"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:8080/api/public/v1/budget-requests" -Body $body -ContentType "application/json"
```
