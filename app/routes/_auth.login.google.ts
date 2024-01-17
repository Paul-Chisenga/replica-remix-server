import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import oauth2Client from "~/services/google.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
  });

  return redirect(authorizationUrl);
};
