import type { LoaderArgs } from "@remix-run/node";
import {
  destroyUserSession,
  requireUserSession,
} from "~/controllers/auth.server";

export async function loader({ request }: LoaderArgs) {
  await requireUserSession(request);
  // if (request.method !== "POST") {
  //   throw json({ message: "Bad request" }, { status: 400 });
  // }
  return destroyUserSession(request);
}
