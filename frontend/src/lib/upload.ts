import { API_URL } from '@/lib/api';


export interface UploadedFile {
  filename: string;
  storagePath: string;
  mimeType: string;
  sizeBytes: number;
}

/**
 * Handles the secure upload process:
 * 1. Requests a Signed URL from the backend
 * 2. Uploads the file directly to GCS
 * 3. Returns the file metadata for the form payload
 */
export async function uploadFileToStorage(file: File): Promise<UploadedFile> {
  // 1. Get Signed URL
  const response = await fetch(`${API_URL}/api/public/v1/budget-requests/upload-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type || 'application/octet-stream'
    })
  });

  if (!response.ok) {
    throw new Error('Falha ao gerar URL de upload seguro');
  }

  const { uploadUrl, storagePath } = await response.json();

  // 2. Upload to GCS
  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream'
    },
    body: file
  });

  if (!uploadResponse.ok) {
    throw new Error('Falha ao enviar arquivo para o Cofre Digital');
  }

  return {
    filename: file.name,
    storagePath,
    mimeType: file.type || 'application/octet-stream',
    sizeBytes: file.size
  };
}
