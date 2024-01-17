import { auth } from "@googleapis/oauth2";

const oauth2Client = new auth.OAuth2(
  process.env.GOOGLE_API_CLIENT_ID!,
  process.env.GOOGLE_API_CLIENT_SECRET!,
  process.env.GOOGLE_API_REDIRECT_URI!
);

export default oauth2Client;
