import {
  CopyObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import crypto from "crypto";

/**
 * Generate random filename for aws
 */
export function generateRandomKey(filename: string, bytes = 32) {
  let generatedName = crypto.randomBytes(bytes).toString("hex");
  const ext = filename.split(".").pop();
  if (ext) {
    generatedName += "." + ext;
  }
  return generatedName;
}

/*
    FILE OPERATION WITH SES
*/
const s3Client = new S3Client({ region: process.env.AWS_REGION });

export const awsGetFileResult = async (Bucket: string, key: string) => {
  try {
    const command = new GetObjectCommand({ Bucket, Key: key });
    const result = await s3Client.send(command);
    if (result.Body) {
      return result;
    } else {
      throw new Error("No result body");
    }
  } catch (error) {
    console.log("FAILED TO GET FILE FROM AWS");
    throw error;
  }
};
export const awsCpyFileToBucket = async (payload: {
  srcBucket: string;
  destBucket: string;
  srcKey: string;
  destKey: string;
}) => {
  const command = new CopyObjectCommand({
    CopySource: payload.srcBucket + "/" + payload.srcKey,
    Bucket: payload.destBucket,
    Key: payload.destKey,
  });

  try {
    await s3Client.send(command);
    console.log("SUCCESS FILE COPIED");
  } catch (err) {
    console.log("ERROR COPYING FILE");
    throw err;
  }
};

export const awsRemoveFile = async (config: {
  bucket: string;
  key: string;
}) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: config.bucket,
      Key: config.key,
    });
    await s3Client.send(command);
    console.log("FILE REMOVED");
  } catch (error) {
    console.log("FAILED TO DELETE FILE");
    throw error;
  }
};
export const awsRemoveFiles = async (config: {
  bucket: string;
  keys: string[];
}) => {
  try {
    const command = new DeleteObjectsCommand({
      Bucket: config.bucket,
      Delete: {
        Objects: config.keys.map((key) => ({ Key: key })),
      },
    });
    await s3Client.send(command);
    console.log("FILES REMOVED");
  } catch (error) {
    console.log("FAILED TO DELETE FILES");
    throw error;
  }
};

export const awsUploadFile = async (config: { bucket: string; file: File }) => {
  const key = generateRandomKey(config.file.name);

  // Build query
  const command = new PutObjectCommand({
    Bucket: config.bucket,
    Key: key,
    Body: Buffer.from(await config.file.arrayBuffer()),
    ContentType: config.file.type,
  });

  try {
    await s3Client.send(command);
    console.log("FILE UPLOADED");
    return key;
  } catch (error) {
    console.log("FAILED TO UPLOAD FILE");
    throw error;
  }
};
