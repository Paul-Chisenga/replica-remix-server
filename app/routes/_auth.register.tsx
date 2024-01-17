import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import FormError from "~/components/common/FormError";
import MyForm from "~/components/Form/MyForm";
import DualRingLoader from "~/components/indicators/DualRingLoader";
import { getUserSession } from "~/controllers/auth.server";
import { sendEmail } from "~/services/email.server";
import { generateToken } from "~/services/jwt";
import prisma from "~/services/prisma.server";
import {
  hasErrors,
  invariantValidate,
  parseCustomError,
  requiredFieldValidate,
} from "~/utils/helpers";
import type { MyObject } from "~/utils/types";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Welcome on board - Replica restaurant" },
    {
      name: "description",
      content: "Create an account and enjoy shopping at replica!",
    },
  ];
};

const Register = () => {
  const actionData = useActionData();
  const navigation = useNavigation();

  if (actionData?.success) {
    return (
      <div className="container">
        <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-md tw-mx-auto">
          <div className="tw-px-2 tw-text-sm tw-text-emerald-500 tw-font-jost">
            Success, A verification link has been sent to your email,
            <br />
            Use the link sent to your email to complete your registration
          </div>
          <br />
        </div>
      </div>
    );
  }

  return (
    <div className="container tw-pb-32">
      <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-screen-sm tw-mx-auto">
        <h4 className="mb-20 tw-text-3xl title">Create an account</h4>
        <br />
        <Form action="" method="POST">
          <MyForm.Group>
            <MyForm.Input
              type="email"
              placeholder="Your email address*"
              label="Email"
              required
              name="email"
            />
            <MyForm.Input
              type="password"
              placeholder="must not be less than 6 characters."
              label="Password"
              required
              name="password"
              minLength={6}
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
            Create Account
            {navigation.state === "submitting" && <DualRingLoader size={15} />}
          </button>
          <div className="tw-text-center tw-my-6 tw-text-sm tw-font-medium tw-font-jost">
            <span className="tw-text-emerald-600">Already registered ?</span>
            <Link
              to="/login"
              className="tw-text-secondary tw-underline hover:tw-text-black tw-inline-block tw-mx-1"
            >
              Login!
            </Link>
          </div>
          {/* SOCIAL MEDIA LOGIN */}
          <div
            className=" tw-pt-4 tw-border-gray-100"
            style={{ borderTop: "1px solid" }}
          >
            <Link
              to={"/login/google"}
              className="my-btn outline rounded dark tw-w-full tw-text-center tw-block"
            >
              <i className="bi bi-google"></i>
              Sign up with google
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;

export async function loader({ request }: LoaderArgs) {
  const session = await getUserSession(request);
  if (session) {
    return redirect("/");
  }
  return null;
}

export async function action({ request }: ActionArgs) {
  const data = Object.fromEntries(await request.formData()) as MyObject<string>;
  // Invariant Validation
  invariantValidate(data);

  // Custom form errors
  const errors = requiredFieldValidate(data, ["email", "password"]);
  if (hasErrors(errors)) {
    return { errors };
  }

  try {
    // await createAdmin({
    //   firstname: data.firstname,
    //   lastname: data.lastname,
    //   email: data.email,
    //   password: data.password,
    //   phone: +data.phone,
    // });
    const user = await prisma.profile.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw parseCustomError(
        "A User with this email exists already, choose another email address.",
        422
      );
    }

    // send verification email
    const token = generateToken(
      {
        email: data.email,
        password: data.password,
      },
      process.env.ACCOUNT_NEW as string
    );

    await sendEmail({
      to: { email: data.email },
      subject: "WELECOME TO REPLICA",
      message: `
      Thank you for registering on replica,

      Click <a href="${process.env.HOST_URL}/register/${token}" target="_blank" rel="noopener noreferrer">here</a> to verify your email address.
      You can ignore this email if you did not initiate this request.
    `,
    });

    return { success: true };
  } catch (error: any) {
    if (error.status === 422) {
      return {
        error: error.message,
      };
    }
    throw new Error("Something went wrong.");
  }
}
