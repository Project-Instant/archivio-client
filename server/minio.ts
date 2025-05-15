import * as Minio from 'minio'
import { promises as fsPromises, existsSync as fsExistsSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import consola from 'consola';

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const BUCKET_TO_DOWNLOAD_FROM = 'pins';
// const LOCAL_DESTINATION_PATH = path.resolve(__dirname, 'minio_downloads', BUCKET_TO_DOWNLOAD_FROM);

const minioConfig: Minio.ClientOptions = {
  endPoint: import.meta.env.MINIO_ENDPOINT,
  port: parseInt(import.meta.env.MINIO_PORT),
  useSSL: import.meta.env.MINIO_USE_SSL === 'true',
  accessKey: import.meta.env.MINIO_ACCESS_KEY,
  secretKey: import.meta.env.MINIO_SECRET_KEY,
  pathStyle: true,
};

let minioClientInstance: Minio.Client | null = null;
let clientInitializationPromise: Promise<Minio.Client> | null = null;

export async function getMinioClient(): Promise<Minio.Client> {
  if (minioClientInstance) return minioClientInstance;

  if (clientInitializationPromise) return clientInitializationPromise;

  clientInitializationPromise = (async () => {
    try {
      consola.info('Initializing MinIO client...');
      const client = new Minio.Client(minioConfig);

      await client.listBuckets();
      consola.success('MinIO client initialized and connection verified.');

      minioClientInstance = client;
      return client;
    } catch (error) {
      consola.error('Failed to initialize MinIO client:', error);
      clientInitializationPromise = null;

      throw error;
    }
  })();

  return clientInitializationPromise;
}

export async function warmUpMinioClient(): Promise<void> {
  try {
    await getMinioClient();
  } catch (error) {
    consola.fatal('MinIO client warm-up failed. Application might not function correctly with MinIO.');
  }
}

async function downloadAllFilesFromBucket(
  bucketName: string, localDownloadDirectoryPath: string, forceDownload: boolean = false
): Promise<void> {
  let minio = await getMinioClient()

  consola.info(`Starting download of all files from bucket "${bucketName}" to "${localDownloadDirectoryPath}"...`);

  try {
    await fsPromises.mkdir(localDownloadDirectoryPath, { recursive: true });
    consola.success(`Ensured local download directory exists: ${localDownloadDirectoryPath}`);
  } catch (error) {
    consola.error(`Failed to create local download directory "${localDownloadDirectoryPath}":`, error);
    return;
  }

  const objectsStream = minio.listObjectsV2(bucketName, '', true);

  let downloadedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  try {
    for await (const object of objectsStream) {
      let item: Minio.BucketItem = object

      const objectName = item.name;

      if (objectName) {
        if (objectName.endsWith('/') && (!item.size || item.size === 0)) {
          consola.log(`Skipping directory-like object: ${objectName}`);
          continue;
        }

        const localFilePath = path.join(localDownloadDirectoryPath, objectName);
        const localFileDir = path.dirname(localFilePath);

        if (!forceDownload && fsExistsSync(localFilePath)) {
          consola.info(`Skipping "${objectName}". Already exists`);
          skippedCount++;
          continue;
        }

        try {
          await fsPromises.mkdir(localFileDir, { recursive: true });
        } catch (mkdirError) {
          consola.error(`Failed to create directory ${localFileDir} for object ${objectName}:`, mkdirError);
          failedCount++;
          continue;
        }

        consola.info(`Downloading "${objectName}" to "${localFilePath}"...`);

        try {
          await minio.fGetObject(bucketName, objectName, localFilePath);
          consola.success(`Successfully downloaded "${objectName}"`);
          downloadedCount++;
        } catch (downloadError) {
          consola.error(`Failed to download "${objectName}":`, downloadError);
          failedCount++;

          try {
            await fsPromises.unlink(localFilePath);
          } catch (e) {
            consola.error(`Failed to remove partially downloaded file ${localFilePath}:`, e);
          }
        }
      } else {
        consola.warn('Found an item without a name in the bucket listing.');
      }
    }
  } catch (streamError) {
    consola.error('Error while streaming object list from Minio:', streamError);
  }

  consola.box(`
    Download process finished.,
    Successfully downloaded: ${downloadedCount} files.
    Skipped: ${skippedCount} files.
    Failed to download: ${failedCount} files.
  `);
}

export async function initMinio() {
  await warmUpMinioClient()
  
  try {
    const minio = await getMinioClient();
    const exists = await minio.bucketExists(BUCKET_TO_DOWNLOAD_FROM);

    const buckets = await minio.listBuckets()

    let objects = 0;

    for await (const bucket of buckets) {
      const objectsStream = minio.listObjectsV2(bucket.name, '', true);

      for await (const object of objectsStream) {
        let item: Minio.BucketItem = object
        objects++;

        consola.log(`/${bucket.name} \n  ${item.name}`);
      }
    }

    consola.box(`Total buckets: ${buckets.length}\nTotal objects: ${objects}  `)

    if (exists) {
      consola.info(`Bucket "${BUCKET_TO_DOWNLOAD_FROM}" exists.`);
    } else {
      consola.error(`Bucket "${BUCKET_TO_DOWNLOAD_FROM}" does not exist. Aborting.`);
      return;
    }
  } catch (e) {
    consola.error('Failed to check bucket existence or connect to Minio:', e);
    return;
  }

  // await downloadAllFilesFromBucket(BUCKET_TO_DOWNLOAD_FROM, LOCAL_DESTINATION_PATH);
}