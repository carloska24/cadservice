import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';
import { GcpConfig } from '../../config/gcp.config';

@Injectable()
export class StorageService {
  private storage: Storage | null = null;
  private bucketName: string;
  private readonly logger = new Logger(StorageService.name);

  constructor(private configService: ConfigService) {
    const config = this.configService.get<GcpConfig>('gcp')!;

    this.logger.log(
      `🔧 Inicializando StorageService. Ambiente: ${config.isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`,
    );

    if (config.isProduction) {
      // EM PRODUÇÃO: Identidade Nativa GCP (ADC)
      // Forçamos o motor ADC com scopes explícitos
      try {
        this.storage = new Storage({
          projectId: config.projectId,
          scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });
        this.bucketName = config.storageBucket;
        this.logger.log(
          `✅ Identidade Nativa GCP Ativada (ADC). Bucket: ${this.bucketName}`,
        );
      } catch (err) {
        this.logger.error(
          '❌ Falha crítica ao assumir identidade da nuvem:',
          err,
        );
        throw err;
      }
    } else {
      // DESENVOLVIMENTO LOCAL: Mock ou Chave Explicitamente Configurada
      if (!config.credentialsPath || config.credentialsPath.includes('mock')) {
        this.logger.warn('⚠️ GCS em MOCK MODE (Local).');
        this.storage = null;
        this.bucketName = config.storageBucket || 'mock-bucket';
      } else {
        try {
          this.storage = new Storage({
            projectId: config.projectId,
            keyFilename: config.credentialsPath,
          });
          this.bucketName = config.storageBucket;
          this.logger.log(
            `✅ Storage LOCAL ativo via: ${config.credentialsPath}`,
          );
        } catch (err) {
          this.logger.error(
            '❌ Falha na chave local. Fallback para MOCK.',
            err,
          );
          this.storage = null;
          this.bucketName = config.storageBucket || 'mock-bucket';
        }
      }
    }
  }

  async generateWriteUrl(
    filename: string,
    contentType: string,
  ): Promise<{ uploadUrl: string; storagePath: string; publicUrl: string }> {
    const storagePath = filename;
    const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${filename}`;

    if (!this.storage) {
      this.logger.debug(`[MOCK] Gerando URL de upload mock para ${filename}`);
      const baseUrl =
        process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';
      return {
        uploadUrl: `${baseUrl}/api/public/v1/budget-requests/mock-upload?file=${encodeURIComponent(filename)}`,
        storagePath,
        publicUrl,
      };
    }

    try {
      const [uploadUrl] = await this.storage
        .bucket(this.bucketName)
        .file(filename)
        .getSignedUrl({
          version: 'v4',
          action: 'write',
          expires: Date.now() + 15 * 60 * 1000, // 15 minutes
          contentType,
        });

      this.logger.log(`🔗 URL de upload assinada gerada: ${filename}`);
      return { uploadUrl, storagePath, publicUrl };
    } catch (err) {
      this.logger.error(`❌ Erro ao gerar Signed URL para ${filename}:`, err);
      throw err;
    }
  }

  async generateReadUrl(filename: string): Promise<string> {
    if (!this.storage) {
      return `https://placehold.co/400x400?text=Mock+File+${encodeURIComponent(
        filename,
      )}`;
    }

    try {
      const [url] = await this.storage
        .bucket(this.bucketName)
        .file(filename)
        .getSignedUrl({
          version: 'v4',
          action: 'read',
          expires: Date.now() + 60 * 60 * 1000, // 1 hour
        });

      return url;
    } catch (err) {
      this.logger.warn(
        `⚠️ Erro ao gerar Read URL para ${filename}. Retornando placeholder.`,
        err,
      );
      return `https://placehold.co/400x400?text=Error+Loading+File`;
    }
  }
}
