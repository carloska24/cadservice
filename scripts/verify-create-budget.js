const https = require('https');

const BACKEND_URL = 'https://cadservice-backend-4nf4k7pywa-uc.a.run.app';
const API_URL = `${BACKEND_URL}/api/public/v1/budget-requests`;

console.log('🚀 Iniciando Teste de Validação de Orçamento (Produção)...');
console.log(`🎯 Target API: ${API_URL}`);

// Payload Simulado (Baseado no DTO e Logs esperados)
const payload = JSON.stringify({
  requesterName: "Debug Script",
  requesterEmail: "debug@cadservice.com.br",
  requesterPhone: "11999999999",
  company: "CadService Debug Team",
  projectDescription: "This is a synthetic test request to validate the POST /budget-requests endpoint status 500.",
  attachments: [
    {
      filename: "test-debug.zip",
      storagePath: "budget-requests/debug-test-file.zip",
      mimeType: "application/zip",
      sizeBytes: 1024 // IMPORTANT: Number, not string
    }
  ]
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payload.length
  }
};

const req = https.request(API_URL, options, (res) => {
  console.log(`\n📥 Status Code: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('--- Response Body ---');
    try {
      const json = JSON.parse(data);
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.log(data);
    }
    console.log('---------------------');
  });
});

req.on('error', (e) => {
  console.error(`❌ Erro na requisição: ${e.message}`);
});

req.write(payload);
req.end();
