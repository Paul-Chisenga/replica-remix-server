import { oauth2 } from "@googleapis/oauth2";
import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Outlet, useActionData, useNavigation } from "@remix-run/react";
import FormError from "~/components/common/FormError";
import MyForm from "~/components/Form/MyForm";
import DualRingLoader from "~/components/indicators/DualRingLoader";
import oauth2Client from "~/services/google.server";
import { generateToken, verifyToken } from "~/services/jwt";
import { sendSMS } from "~/services/twilio.server";
import { generateVerificationCode } from "~/utils/helpers";
import type { MyObject, RegistrationPayload } from "~/utils/types";

export default function SubmitPhoneNumber() {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <>
      <div className="container">
        <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-md tw-mx-auto">
          <h4 className="mb-20 tw-text-3xl title">Phone Number</h4>
          <p className="tw-px-2 tw-text-sm tw-font-jost">
            Please enter your phone number below.
          </p>
          <br />
          <Form action="" method="POST">
            <MyForm.Group>
              <MyForm.Input
                type="tel"
                placeholder="07..."
                minLength={10}
                maxLength={10}
                required
                name="phone"
              />
            </MyForm.Group>
            <MyForm.Group>
              <MyForm.Misc>
                <FormError>{actionData?.error}</FormError>
              </MyForm.Misc>
            </MyForm.Group>
            <button
              type="submit"
              className="primary-btn8 lg--btn btn-primary-fill tw-block tw-w-full"
            >
              Submit
              {navigation.state === "submitting" && (
                <DualRingLoader size={15} />
              )}
            </button>
          </Form>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export const action = async ({ request, params }: ActionArgs) => {
  if (request.method !== "POST") {
    throw new Error("Bad request.");
  }

  const formData = await request.formData();
  const phone = formData.get("phone") as string;
  const token = params.token as string;

  // Ensures this link is called through the google oauth response pocess
  const payload = verifyToken(
    token,
    process.env.ACCOUNT_NEW!
  ) as MyObject<string>;

  if (!payload || payload.provider !== "google") {
    return redirect("/login");
  }
  if (!phone) {
    return { error: "Phone number is required" };
  }

  try {
    const client = oauth2("v2");
    const userinfo = await client.userinfo.get({ auth: oauth2Client });
    if (userinfo.statusText !== "OK") {
      throw new Error("An error occured.");
    }

    const verificationCode = generateVerificationCode();

    const registrationPayload: RegistrationPayload = {
      role: Role.CUSTOMER,
      firstname: userinfo.data.given_name!,
      lastname: userinfo.data.family_name ?? userinfo.data.name!,
      email: userinfo.data.email!,
      password: userinfo.data.id!,
      phone: +phone,
      code: verificationCode,
      provider: "google",
    };

    const verificationToken = generateToken(
      registrationPayload,
      process.env.ACCOUNT_NEW!
    );

    await sendSMS(
      `+254${+phone}`,
      `Your verification code from REPLICA is ${verificationCode}`
    );

    return redirect(`/register/verify/${verificationToken}`);
  } catch (error) {
    throw new Error("Something went wrong.");
  }
};
