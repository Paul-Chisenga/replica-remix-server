import { Role } from "@prisma/client";
import {
  redirect,
  type LoaderArgs,
  type V2_MetaFunction,
} from "@remix-run/node";
import { Form, Outlet, useActionData, useNavigation } from "@remix-run/react";
import FormError from "~/components/common/FormError";
import MyForm from "~/components/Form/MyForm";
import DualRingLoader from "~/components/indicators/DualRingLoader";
import { generateToken, verifyToken } from "~/services/jwt";
import prisma from "~/services/prisma.server";
import { sendSMS } from "~/services/twilio.server";
import {
  generateVerificationCode,
  hasErrors,
  invariantValidate,
  requiredFieldValidate,
} from "~/utils/helpers";
import type { MyObject, RegistrationPayload } from "~/utils/types";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Welcome on board - Replica restaurant" },
    {
      name: "description",
      content: "Create an account and enjoy shopping at replica!",
    },
  ];
};

const CompleteRegistration = () => {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <div className="container tw-pb-32">
      <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-screen-sm tw-mx-auto">
        <h4 className="mb-20 tw-text-3xl title">Welcome back!</h4>
        <p className="tw-px-2 tw-text-sm tw-font-jost">
          Please complete your registration below.
        </p>
        <br />
        <Form action="" method="POST">
          <MyForm.Group>
            <MyForm.Input
              type="text"
              placeholder="Your first name*"
              label="First Name"
              required
              name="firstname"
              errormessage={actionData?.firstname}
            />
            <MyForm.Input
              type="text"
              placeholder="Your last name*"
              label="Last Name"
              required
              name="lastname"
              errormessage={actionData?.lastname}
            />
            <MyForm.Input
              type="tel"
              placeholder="eg. 07......"
              label="Your phone number"
              required
              name="phone"
              minLength={10}
              maxLength={10}
              errormessage={actionData?.errors?.phone}
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
            {navigation.state === "submitting" && <DualRingLoader size={15} />}
          </button>
        </Form>
      </div>
      <Outlet />
    </div>
  );
};

export default CompleteRegistration;

export async function action({ request, params }: LoaderArgs) {
  if (request.method !== "POST") {
    throw new Error("Bad request.");
  }

  const data = Object.fromEntries(await request.formData()) as MyObject<string>;
  // Invariant Validation
  invariantValidate(data);

  // Custom form errors
  const errors = requiredFieldValidate(data, [
    "firstname",
    "lastname",
    "phone",
  ]);

  if (hasErrors(errors)) {
    return { errors };
  }

  if (`${+data.phone}`.length !== 9) {
    return {
      errors: {
        phone: "Invalid phone number",
      },
    };
  }

  const basePayload = verifyToken(
    params.token!,
    process.env.ACCOUNT_NEW as string
  ) as { email: string; password: string };

  if (!basePayload) {
    throw new Error("An error occured.");
  }

  try {
    const user = await prisma.profile.findUnique({
      where: { email: basePayload.email },
    });

    if (user) {
      return {
        error:
          "A User with this email exists already, choose another email address.",
      };
    }

    const verificationCode = generateVerificationCode();

    const registrationPayload: RegistrationPayload = {
      role: Role.CUSTOMER,
      firstname: data.firstname,
      lastname: data.firstname,
      phone: +data.phone,
      code: verificationCode,
      ...basePayload,
    };

    const verificationToken = generateToken(
      registrationPayload,
      process.env.ACCOUNT_NEW!
    );
    await sendSMS(
      `+254${+data.phone}`,
      `Your verification code from REPLICA is ${verificationCode}`
    );

    return redirect(`/register/verify/${verificationToken}`);
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}
