import { GetObjectCommand, PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { URL } from 'url';
import { v4 as uuidv4 } from 'uuid';

export class S3Service {
  private readonly s3Client: S3Client;
  private bucketName = 'testbucketcms1';
  constructor(private readonly config: S3ClientConfig) {
    this.s3Client = new S3Client(config);
  }

  async upload({
    bucketName,
    fileName,
    file,
    contentType,
    contentEncoding,
  }: {
    bucketName: string;
    fileName: string;
    file: any;
    contentType?: string;
    contentEncoding?: string;
  }) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType,
        ContentEncoding: contentEncoding,
      }),
    );

    const url = `https://${bucketName}.s3.${this.config.region}.amazonaws.com/${fileName}`;

    return url;
  }

  async uploadBase64File(base64Data: string, keyPrefix: string): Promise<string> {
    // Extraer el contenido del archivo base64
    const buffer = Buffer.from(base64Data.replace(/^data:.+;base64,/, ''), 'base64');
    const fileExtension = this.getFileExtension(base64Data);
    const key = `${keyPrefix}/${uuidv4()}.${fileExtension}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: this.getMimeType(base64Data),
    };

    await this.s3Client.send(new PutObjectCommand(uploadParams));

    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  private getFileExtension(base64Data: string): string {
    const match = base64Data.match(/data:(.+);base64,/);
    return match ? match[1].split('/')[1] : 'bin';
  }

  private getMimeType(base64Data: string): string {
    const match = base64Data.match(/data:(.+);base64,/);
    return match ? match[1] : 'application/octet-stream';
  }

  async get(url: string) {
    const { hostname, pathname } = new URL(url);
    const bucket = hostname.split('.')[0];
    const key = pathname.substring(1);

    return await this.s3Client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
  }
}
