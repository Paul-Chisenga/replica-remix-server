import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_createFileUploadHandler,
} from "@remix-run/node";

export const local_fileUploadeHandler = unstable_createFileUploadHandler({
  directory: "./public/uploads",
  file: ({ filename }) => filename,
});

export const fileUploadeHandler = unstable_composeUploadHandlers(
  async ({ filename, data, contentType, name }) => {
    if (name !== "attachments") {
      return undefined;
    }
    const dataArray = [];

    for await (const chunk of data) {
      dataArray.push(chunk);
    }
    const file = new File(dataArray, filename!, {
      type: contentType,
    });

    return file;
  },
  unstable_createMemoryUploadHandler()
);
