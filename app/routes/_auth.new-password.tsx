import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useNavigation, useSearchParams } from "@remix-run/react";
import invariant from "invariant";
import { useTypedActionData } from "remix-typedjson";
import MyForm from "~/components/Form/MyForm";
import DualRingLoader from "~/components/indicators/DualRingLoader";
import { getUserSession, login } from "~/controllers/auth.server";
import { hashPassword } from "~/services/bcrypt.server";
import { verifyToken } from "~/services/jwt";
import prisma from "~/services/prisma.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New password - Replica restaurant" },
    {
      name: "description",
      content: "Restore a forgotten password!",
    },
  ];
};

const LostPWD = () => {
  const actionData = useTypedActionData();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("t");
  const navigation = useNavigation();

  return (
    <div className="container">
      <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-md tw-mx-auto">
        <h4 className="mb-20 tw-text-3xl title">New Password</h4>
        <p className="tw-px-2 tw-text-sm tw-font-jost">
          Enter your new password
        </p>
        {actionData?.error && (
          <div className="tw-px-2 tw-text-sm tw-text-red-500 tw-font-jost">
            {actionData?.error}
          </div>
        )}
        <br />
        <Form action="" method="POST">
          <input type="hidden" name="token" value={token!} />
          <MyForm.Group>
            <MyForm.Input
              type="password"
              placeholder="must not be less than 6 characters."
              minLength={6}
              required
              name="password"
            />
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
    </div>
  );
};

export default LostPWD;
export async function loader({ request }: LoaderArgs) {
  const session = await getUserSession(request);

  if (session) {
    return redirect("/");
  }

  const searchParams = new URL(request.url).searchParams;
  const token = searchParams.get("t");
  if (!token) {
    throw new Error("Invalid link.");
  }

  return null;
}

export async function action({ request }: ActionArgs) {
  if (request.method !== "POST") {
    throw new Error("Bad Request");
  }
  const formData = await request.formData();
  const password = formData.get("password");
  const token = formData.get("token");

  // validate token
  if (!token || typeof token !== "string") {
    throw new Error("Invalid request");
  }
  // Invariant Validation
  invariant(typeof password === "string", "password must be a string");
  // Custom form errors
  const errors = {
    password: password ? null : "Password is required",
  };

  //If has errors return the error object
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return errors;
  }

  try {
    const decodedToken = verifyToken(
      token,
      process.env.ACCOUNT_RESET as string
    ) as any;
    const { email } = decodedToken;
    const pwd = await hashPassword(password);
    const user = await prisma.profile.update({
      where: {
        email,
      },
      data: {
        password: pwd,
      },
    });

    return login({ email: user.email, password }, "/");
  } catch (error: any) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
