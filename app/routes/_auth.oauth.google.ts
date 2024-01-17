import { oauth2 } from "@googleapis/oauth2";
import type { JsonObject } from "@prisma/client/runtime/library";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { login } from "~/controllers/auth.server";
import oauth2Client from "~/services/google.server";
import { generateToken } from "~/services/jwt";
import prisma from "~/services/prisma.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  const searchParams = new URL(request.url).searchParams;
  const queries = Object.fromEntries(searchParams);
  const { error, code } = queries;
  if (error) {
    throw new Error("An error occured");
  } else {
    let { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const client = oauth2("v2");
    const userinfo = await client.userinfo.get({ auth: oauth2Client });

    if (userinfo.statusText === "OK") {
      const profile = await prisma.profile.findUnique({
        where: {
          email: userinfo.data.email!,
        },
      });

      if (profile) {
        console.log(profile);
        const metaData = profile.meta as JsonObject | undefined;
        const provider = metaData?.provider;
        if (provider && provider === "google") {
          // if user previously logged in with the google account
          return login(
            {
              email: profile.email,
              password: profile.password,
              provider: true,
            },
            "/"
          );
        } else {
          // if user registered already with a different provider, prompt user to login differently
          return redirect(
            "/login?error=There is an account with this email already. please login with your password."
          );
        }
      } else {
        // if there is no user with this email proceed to verifying the phone number
        return redirect(
          generateToken({ provider: "google" }, process.env.ACCOUNT_NEW!)
        );
      }
    } else {
      // if can't fing the google profile for some reason
      return redirect("/login?error=An error occured, Try again later.");
    }
  }
};
