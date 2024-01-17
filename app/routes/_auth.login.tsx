import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useNavigation, useSearchParams } from "@remix-run/react";
import invariant from "invariant";
import { useTypedActionData } from "remix-typedjson";
import FormError from "~/components/common/FormError";
import MyForm from "~/components/Form/MyForm";
import DualRingLoader from "~/components/indicators/DualRingLoader";
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
  const [searchParams] = useSearchParams();
  const next = searchParams.get("next");
  const navigation = useNavigation();

  return (
    <div className="container tw-pb-32">
      <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-md tw-mx-auto">
        <h4 className="mb-20 tw-text-3xl title">Login</h4>
        <br />
        <Form action="" method="POST">
          <input type="hidden" name="next" value={next ?? ""} />
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
          <MyForm.Group>
            <FormError>
              {actionData?.error ?? searchParams.get("error")}
            </FormError>
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
            <span>Login</span>
            {navigation.state === "submitting" && <DualRingLoader size={15} />}
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
          {/* SOCIAL MEDIA LOGIN */}
          <div
            className=" tw-pt-4 tw-border-gray-100"
            style={{ borderTop: "1px solid" }}
          >
            <Link
              to={"google"}
              className="my-btn outline rounded dark tw-w-full tw-text-center tw-block"
            >
              <i className="bi bi-google"></i>
              Sign in with google
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

export async function action({ request }: ActionArgs) {
  const { email, password, next } = Object.fromEntries(
    await request.formData()
  );
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
  let url = "/";
  if (next) {
    url = next as string;
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
