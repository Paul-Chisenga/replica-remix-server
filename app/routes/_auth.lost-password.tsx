import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import invariant from "invariant";
import { useTypedActionData } from "remix-typedjson";
import MyForm from "~/components/Form/MyForm";
import { getUserSession } from "~/controllers/auth.server";
import { sendEmail } from "~/services/email.server";
import { generateToken } from "~/services/jwt";
import prisma from "~/services/prisma.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Lost password - Replica restaurant" },
    {
      name: "description",
      content: "Restore a forgotten password!",
    },
  ];
};

const LostPWD = () => {
  const actionData = useTypedActionData();
  return (
    <div className="container">
      <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-md tw-mx-auto">
        <h4 className="mb-20 tw-text-3xl title">Lost Password</h4>
        <p className="tw-px-2 tw-text-sm tw-font-jost">
          Enter the email for your account
        </p>
        {actionData?.error && (
          <div className="tw-px-2 tw-text-sm tw-text-red-500 tw-font-jost">
            {actionData?.error}
          </div>
        )}
        {actionData?.success && (
          <div className="tw-px-2 tw-text-sm tw-text-emerald-500 tw-font-jost">
            Check the link that has been sent to your email to reset your
            password.
          </div>
        )}
        <br />
        <Form action="" method="POST">
          <MyForm.Group>
            <MyForm.Input
              type="text"
              placeholder="example@example.com"
              // label="Email"
              required
              name="email"
            />
          </MyForm.Group>
          <div className="tw-text-right tw-mb-6">
            <Link
              to="/login"
              className="tw-no-underline tw-text-dark hover:tw-text-primary tw-text-sm tw-font-medium tw-font-jost"
            >
              Go to login
            </Link>
          </div>
          <button
            type="submit"
            className="primary-btn8 lg--btn btn-primary-fill tw-block tw-w-full"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default LostPWD;

export async function loader({ request }: LoaderArgs) {
  const session = await getUserSession(request);
  if (session) {
    return redirect("/");
  }
  return null;
}

export async function action({ request }: ActionArgs) {
  if (request.method !== "POST") {
    throw new Error("Bad Request");
  }
  const formData = await request.formData();
  const email = formData.get("email");

  // Invariant Validation
  invariant(typeof email === "string", "email must be a string");
  // Custom form errors
  const errors = {
    email: email ? null : "Email is required",
  };

  //If has errors return the error object
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return errors;
  }

  try {
    // create a reset link
    const user = await prisma.profile.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        error: "Email  not found",
      };
    }

    const token = generateToken({ email }, process.env.ACCOUNT_RESET as string);
    await sendEmail({
      to: {
        name: user.firstname,
        email: user.email,
      },
      subject: "REPLICA PASSWORD RESET",
      message: `
      Hey ${user.firstname},
      
      You have request to reset your password for your replica account,
      
      Click <a href="${process.env.HOST_URL}/new-password?t=${token}" target="_blank" rel="noopener noreferrer">here</a> to reset your password.
      You can ignore this email if you did not initiate this request.
    `,
    });
    return { success: true };
  } catch (error: any) {
    throw new Error("Something went wrong");
  }
}
