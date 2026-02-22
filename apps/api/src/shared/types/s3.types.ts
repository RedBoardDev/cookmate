export enum AllowedMimeTypes {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  WEBP = 'image/webp',
  AVIF = 'image/avif',
}

export interface S3PutObjectInput {
  mimeType: AllowedMimeTypes;
  originalFilename: string;
  fileSize?: number;
}

export interface S3PutObjectOutput {
  uploadUrl: string;
  storageKey: string;
  expiresIn: number;
}

export interface S3GetObjectInput {
  storageKey: string;
}

export interface S3GetObjectOutput {
  url: string;
}
