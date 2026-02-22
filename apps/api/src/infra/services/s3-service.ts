import path from 'node:path';
import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v7 as uuidv7 } from 'uuid';
import type { AppEnv } from '@/config/env';
import type {
  S3GetObjectInput,
  S3GetObjectOutput,
  S3PutObjectInput,
  S3PutObjectOutput
} from '@/shared/types/s3.types';

export class S3Service {
  private static instance: S3Service | null = null;
  private s3Client: S3Client;
  private bucketName: string;

  private readonly PUT_URL_EXPIRATION = 30;
  private readonly GET_URL_EXPIRATION = 60 * 60;

  private constructor(env: AppEnv) {
    this.bucketName = env.AWS_S3_BUCKET_NAME;
    this.s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
      },
    });
  }

  public static getInstance(env?: AppEnv): S3Service {
    if (S3Service.instance) return S3Service.instance;
    if (!env) throw new Error("S3Service: call getInstance(env) once at startup");
    S3Service.instance = new S3Service(env);
    return S3Service.instance;
  }

  public async checkConnection(): Promise<void> {
    const command = new HeadBucketCommand({ Bucket: this.bucketName });
    await this.s3Client.send(command);
  }

  private sanitizeExtension(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    return ext === '' ? '.png' : ext;
  }

  private generateStorageKey(userId: string, recipeId: string, filename: string): string {
    const ext = this.sanitizeExtension(filename);
    const fileId = uuidv7();
    return `users/${userId}/recipes/${recipeId}/${fileId}${ext}`;
  }

  public async generatePutPreSignedUrl(userId: string, recipeId: string, input: S3PutObjectInput): Promise<S3PutObjectOutput> {
    const storageKey = this.generateStorageKey(userId, recipeId, input.originalFilename);

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: storageKey,
      ContentType: input.mimeType,
      Metadata: {
        userId,
        recipeId,
        originalName: Buffer.from(input.originalFilename).toString('base64'),
      },
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: this.PUT_URL_EXPIRATION
    });

    return { uploadUrl, storageKey, expiresIn: this.PUT_URL_EXPIRATION };
  }

  public async generatePutPreSignedUrls(userId: string, recipeId: string, inputs: S3PutObjectInput[]): Promise<S3PutObjectOutput[]> {
    return Promise.all(inputs.map(input => this.generatePutPreSignedUrl(userId, recipeId, input)));
  }

  public async generateGetPreSignedUrl(input: S3GetObjectInput): Promise<S3GetObjectOutput> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: input.storageKey,
    });

    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: this.GET_URL_EXPIRATION
    });

    return { url };
  }

  public async deleteObject(storageKey: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: storageKey,
    });
    await this.s3Client.send(command);
  }

  public async deleteObjects(storageKeys: string[]): Promise<void> {
    if (!storageKeys.length) return;

    const command = new DeleteObjectsCommand({
      Bucket: this.bucketName,
      Delete: {
        Objects: storageKeys.map(key => ({ Key: key })),
        Quiet: false,
      },
    });

    await this.s3Client.send(command);
  }
}

export const getS3Service = (): S3Service => S3Service.getInstance();