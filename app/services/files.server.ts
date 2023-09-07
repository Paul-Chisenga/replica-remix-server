import { fileTypeFromBuffer } from "file-type";
import {
  awsGetFileResult,
  awsRemoveFile,
  awsRemoveFiles,
  awsUploadFile,
} from "./aws.server";

const BUCKET = process.env.AWS_BUCKET as string;

export const uploadFile = async (file: File) => {
  const key = awsUploadFile({ bucket: BUCKET, file });
  return key;
};

export const downloadFile = async (key: string, name?: string) => {
  const result = await awsGetFileResult(process.env.AWS_BUCKET as string, key);
  if (result.Body) {
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const bytes = await result.Body.transformToByteArray();
    const file_type = await fileTypeFromBuffer(bytes);

    const res = new Response(bytes);
    if (file_type) {
      res.headers.append("Content-Type", file_type.mime);
    }
    if (name) {
      res.headers.append("Content-Disposition", "inline; filename=" + name);
    }
    return res;
  } else {
    throw new Error("No body from AWS");
  }
};

export const deleteFile = async (key: string) => {
  await awsRemoveFile({ bucket: BUCKET, key });
};

export const deleteFiles = async (keys: string[]) => {
  await awsRemoveFiles({ bucket: BUCKET, keys });
};
