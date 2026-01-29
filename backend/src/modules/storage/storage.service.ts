import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucketName: string;
  private readonly logger = new Logger(StorageService.name);

  constructor(private configService: ConfigService) {
    this.storage = new Storage({
      projectId: this.configService.getOrThrow('GCP_PROJECT_ID'),
      // In Cloud Run, credentials are auto-discovered from Service Account
      // Locally, ensure GOOGLE_APPLICATION_CREDENTIALS is set
      keyFilename: this.configService.get('GOOGLE_APPLICATION_CREDENTIALS'),
    });
    this.bucketName = this.configService.getOrThrow('GCP_STORAGE_BUCKET');
  }

  /**
   * Generates a V4 Signed URL for uploading a file directly to GCS.
   * @param filename Desired filename
   * @param contentType MIME type of the file
   * @returns Signed URL and the storage path
   */
  async generateWriteUrl(filename: string, contentType: string): Promise<{ uploadUrl: string; storagePath: string; publicUrl: string }> {
    const options = {
      version: 'v4' as const,
      action: 'write' as const,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType,
    };

    const [uploadUrl] = await this.storage
      .bucket(this.bucketName)
      .file(filename)
      .getSignedUrl(options);

    const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${filename}`;
    const storagePath = filename;

    this.logger.log(`Generated signed write URL for ${filename}`);

    return { uploadUrl, storagePath, publicUrl };
  }

  /**
   * Generates a V4 Signed URL for reading a file from GCS.
   * @param filename Path of the file in the bucket
   * @returns Signed URL valid for 1 hour
   */
  async generateReadUrl(filename: string): Promise<string> {
    const options = {
      version: 'v4' as const,
      action: 'read' as const,
      expires: Date.now() + 60 * 60 * 1000, // 1 hour
    };

    const [url] = await this.storage
      .bucket(this.bucketName)
      .file(filename)
      .getSignedUrl(options);

    return url;
  }
}
