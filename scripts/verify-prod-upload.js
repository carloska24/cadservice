const https = require('https');
const fs = require('fs');
const path = require('path');

const BACKEND_URL = 'https://cadservice-backend-4nf4k7pywa-uc.a.run.app';
const API_URL = `${BACKEND_URL}/api/public/v1/budget-requests/upload-url`;

console.log('🚀 Iniciando Teste de Upload (Produção)...');
console.log(`🎯 Target API: ${API_URL}`);

// Dummy Payload
const payload = JSON.stringify({
  filename: 'test-upload-debug.zip',
  contentType: 'application/zip'
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
    try {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log('✅ Signed URL Gerada com Sucesso!');
        const responseCtx = JSON.parse(data);
        console.log('🔑 Upload URL:', responseCtx.uploadUrl.substring(0, 50) + '...');
        console.log('📂 Storage Path:', responseCtx.storagePath);
        
        console.log('\n--- Próximo Passo: Teste CURL para Upload ---');
        console.log(`curl -X PUT -H "Content-Type: application/zip" --data-binary @test.zip "${responseCtx.uploadUrl}"`);
        console.log('---------------------------------------------');
      } else {
        console.error('❌ Falha ao obter Signed URL');
        console.error('Response Body:', data);
      }
    } catch (e) {
      console.error('❌ Erro ao parsear resposta:', e.message);
      console.log('Raw Data:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Erro na requisição: ${e.message}`);
});

req.write(payload);
req.end();
