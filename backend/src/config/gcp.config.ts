import { registerAs } from '@nestjs/config';

export interface GcpConfig {
  projectId: string;
  storageBucket: string;
  credentialsPath?: string;
  isProduction: boolean;
}

export const gcpConfig = registerAs('gcp', (): GcpConfig => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    projectId: process.env.GCP_PROJECT_ID || (isProduction ? '' : 'local-dev'),
    storageBucket:
      process.env.GCP_STORAGE_BUCKET ||
      (isProduction ? 'cadservice-uploads-prod' : 'local-bucket'),
    credentialsPath: isProduction
      ? undefined
      : process.env.GOOGLE_APPLICATION_CREDENTIALS,
    isProduction,
  };
});
