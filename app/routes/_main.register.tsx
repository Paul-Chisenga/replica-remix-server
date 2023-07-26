import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import MyForm from "~/components/Form/MyForm";
import { createAdmin } from "~/controllers/admin.server";
import { getUserSession, login } from "~/controllers/auth.server";
import {
  hasErrors,
  invariantValidate,
  requiredFieldValidate,
} from "~/utils/helpers";
import type { MyObject } from "~/utils/types";

const Register = () => {
  const actionData = useActionData();

  return (
    <>
      <div className="tw-relative tw-h-[100px] tw-overflow-hidden tw-bg-black">
        <img
          src="/images/bg/register.bg.jpeg"
          alt=""
          className="img-fuild tw-opacity-10"
        />
      </div>
      <div className="container tw-my-32">
        <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-screen-sm tw-mx-auto">
          <h4 className="mb-20 tw-text-3xl title">Create an account</h4>
          {actionData?.error && (
            <div className="tw-px-2 tw-text-sm tw-text-red-500 tw-font-jost">
              {actionData?.error}
            </div>
          )}
          <br />
          <Form action="" method="POST">
            <MyForm.Group>
              <MyForm.Misc>
                <div className="row">
                  <div className="col-lg-6">
                    <MyForm.Input
                      type="text"
                      placeholder="Your first name"
                      label="First Name"
                      required
                      name="firstname"
                    />
                  </div>
                  <div className="col-lg-6">
                    <MyForm.Input
                      type="text"
                      placeholder="Your last name"
                      label="Last Name"
                      required
                      name="lastname"
                    />
                  </div>
                  <div className="col-12">
                    <MyForm.Input
                      type="email"
                      placeholder="Your email address"
                      label="Email"
                      required
                      name="email"
                    />
                  </div>
                  <div className="col-12">
                    <MyForm.Input
                      type="tel"
                      placeholder="eg. 07......"
                      label="Your phone number"
                      required
                      name="phone"
                      errormessage={actionData?.errors?.phone}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <MyForm.Input
                    type="password"
                    placeholder="password"
                    label="Password"
                    required
                    name="password"
                  />
                </div>
              </MyForm.Misc>
            </MyForm.Group>

            <button
              type="submit"
              className="primary-btn8 lg--btn btn-primary-fill tw-block tw-w-full"
            >
              Create Account
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
          </Form>
        </div>
      </div>
    </>
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
  const errors = requiredFieldValidate(data, [
    "firstname",
    "lastname",
    "email",
    "phone",
    "password",
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

  try {
    await createAdmin({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      phone: +data.phone,
    });

    return login({ email: data.email, password: data.password }, "/");
  } catch (error: any) {
    if (error.status === 422) {
      return {
        error: error.message,
      };
    }
    throw new Error("Something went wrong.");
  }
}
