import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import invariant from "invariant";
import { useTypedActionData } from "remix-typedjson";
import MyForm from "~/components/Form/MyForm";
import { getUserSession, login } from "~/controllers/auth.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Welcome back - Replica restaurant" },
    {
      name: "description",
      content: "Login into your account and enjoy shopping at replica!",
    },
  ];
};

const Authentication = () => {
  const actionData = useTypedActionData();
  return (
    <div className="container tw-my-32">
      <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-md tw-mx-auto">
        <h4 className="mb-20 tw-text-3xl title">Login</h4>
        {actionData?.error && (
          <div className="tw-px-2 tw-text-sm tw-text-red-500 tw-font-jost">
            {actionData?.error}
          </div>
        )}
        <br />
        <Form action="" method="POST">
          <MyForm.Group>
            <MyForm.Input
              type="text"
              placeholder="Your email address"
              label="Email"
              required
              name="email"
            />
            <MyForm.Input
              type="password"
              placeholder="password"
              label="Password"
              required
              name="password"
            />
          </MyForm.Group>
          <div className="tw-text-right tw-mb-6">
            <Link
              to="/lost-password"
              className="tw-no-underline tw-text-dark hover:tw-text-primary tw-text-sm tw-font-medium tw-font-jost"
            >
              Forgot password ?
            </Link>
          </div>
          <button
            type="submit"
            className="primary-btn8 lg--btn btn-primary-fill tw-block tw-w-full"
          >
            Login
          </button>
          <div className="tw-text-center tw-my-6 tw-text-sm tw-font-medium tw-font-jost">
            <span className="tw-text-emerald-600">Not registered ?</span>
            <Link
              to="/register"
              className="tw-text-secondary tw-underline hover:tw-text-black tw-inline-block tw-mx-1"
            >
              Create an account!
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Authentication;
export async function loader({ request }: LoaderArgs) {
  const session = await getUserSession(request);
  if (session) {
    return redirect("/");
  }
  return null;
}

export async function action({ request, params }: ActionArgs) {
  const { email, password } = Object.fromEntries(await request.formData());
  // Invariant Validation
  invariant(typeof email === "string", "email must be a string");
  invariant(typeof password === "string", "password must be a string");
  // Custom form errors
  const errors = {
    email: email ? null : "Username is required",
    password: password ? null : "Password is required",
  };

  //If has errors return the error object
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return errors;
  }

  // reach the server
  const next = new URL(request.url).searchParams.get("next");
  let url = "/";
  if (next) {
    url = next;
  }

  try {
    return await login({ email, password }, url);
  } catch (error: any) {
    if (error.status === 422) {
      return {
        error: error.message,
      };
    }
    console.log("LOGIN", error);
    throw new Error("Something went wrong");
  }
}
