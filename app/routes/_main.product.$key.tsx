import type { LoaderFunction } from "@remix-run/node";
import { downloadFile } from "~/services/files.server";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    return downloadFile(params.key!);
  } catch (error) {
    throw new Error("Something went wrong.");
  }
};
