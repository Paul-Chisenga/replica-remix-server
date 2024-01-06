import { Role } from "@prisma/client";
import { redirect } from "@remix-run/node";
import type {
  ActionFunction,
  LoaderArgs,
  V2_MetaFunction,
} from "@remix-run/node";

import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import type { FormEvent } from "react";
import { useState } from "react";
import FormError from "~/components/common/FormError";
import FormSuccess from "~/components/common/FormSuccess";
import MyForm from "~/components/Form/MyForm";
import { hashPassword } from "~/services/bcrypt.server";
import { verifyToken } from "~/services/jwt";
import prisma from "~/services/prisma.server";
import {
  hasErrors,
  invariantValidate,
  requiredFieldValidate,
} from "~/utils/helpers";
import type { MyObject } from "~/utils/types";
import DualRingLoader from "~/components/indicators/DualRingLoader";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Welcome on board - Replica restaurant" },
    {
      name: "description",
      content: "Create an account and enjoy riding at replica!",
    },
  ];
};

const VerifyAccount = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const [password, setPassword] = useState("");
  const [confrimPwd, setConfrimPwd] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  const navigation = useNavigation();

  const handleSubmit = (e: FormEvent) => {
    setError("");
    if (
      password.trim() !== confrimPwd.trim() ||
      code.trim() !== loaderData.verificationCode
    ) {
      e.preventDefault();
      if (password !== confrimPwd) {
        setError("Password do not match.");
      } else {
        setError("The verification code is incorrect");
      }
      return;
    }
  };

  if (actionData?.success) {
    return (
      <div className="container">
        <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-screen-sm tw-mx-auto">
          <div className="tw-px-2 tw-text-sm tw-text-emerald-500 tw-font-jost">
            Success, your account is now verified.
            <Link to="/login" className="tw-text-inherit tw-underline">
              Login
            </Link>
          </div>
          <br />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-screen-sm tw-mx-auto">
        <h4 className="mb-20 tw-text-3xl title">Verify your account</h4>
        <br />
        <Form action="" method="POST" onSubmit={handleSubmit}>
          <MyForm.Group>
            <MyForm.Misc>
              <input
                type="hidden"
                name="firstname"
                value={loaderData.firstname}
              />
              <input
                type="hidden"
                name="lastname"
                value={loaderData.lastname}
              />
              <input type="hidden" name="email" value={loaderData.email} />
              <input type="hidden" name="phone" value={loaderData.phone} />
              <input
                type="hidden"
                name="verificationCode"
                value={loaderData.verificationCode}
              />

              <div className="row">
                <div className="col-lg-6">
                  <MyForm.Input
                    type="password"
                    placeholder="must not be less than 6 characters."
                    label="Password"
                    required
                    name="password"
                    minLength={6}
                    errormessage={actionData?.errors?.password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <MyForm.Input
                    type="password"
                    label="Confrim password"
                    required
                    minLength={6}
                    value={confrimPwd}
                    onChange={(e) => setConfrimPwd(e.target.value)}
                  />
                </div>
                <div className="col-lg-4">
                  <MyForm.Input
                    label="Verification code"
                    required
                    name="code"
                    minLength={4}
                    errormessage={actionData?.errors?.code}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>
            </MyForm.Misc>
          </MyForm.Group>
          <MyForm.Group className="mb-20">
            <FormError>{actionData?.error ?? error}</FormError>
            {actionData?.success && (
              <FormSuccess>
                Success, Your account has been successfuly created,
                <br />
                You can login with your email and password
              </FormSuccess>
            )}
          </MyForm.Group>
          <button
            type="submit"
            className="my-btn fill semi-rounded primary tw-block tw-w-full"
          >
            <span>Verify account</span>
            {navigation.state === "submitting" && <DualRingLoader size={15} />}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default VerifyAccount;

export async function loader({ params }: LoaderArgs) {
  const { token } = params;

  if (!token) {
    throw new Error("Invalid Link");
  }

  const registrationPayload = verifyToken(
    token,
    process.env.ACCOUNT_NEW as string
  ) as any;

  if (!registrationPayload) {
    throw new Error("Invalid link");
  }

  const errors = requiredFieldValidate(registrationPayload, [
    "firstname",
    "lastname",
    "email",
    "phone",
  ]);
  if (hasErrors(errors)) {
    throw new Error("Invalid link");
  }

  return registrationPayload;
}

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    throw new Error("Bad request");
  }
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
    "verificationCode",
    "code",
  ]);
  if (hasErrors(errors)) {
    return { errors, error: "Some fields are missing." };
  }

  if (`${+data.phone}`.length !== 9) {
    return {
      errors: {
        phone: "Invalid phone number",
      },
    };
  }

  if (data.verificationCode !== data.code) {
    return { error: "Incorrect verification code" };
  }

  const user = await prisma.profile.findUnique({
    where: { email: data.email },
  });

  if (user) {
    return redirect("/login");
  }

  try {
    const password = await hashPassword(data.password.trim());
    await prisma.rider.create({
      data: {
        profile: {
          create: {
            role: Role.RIDER,
            firstname: data.firstname.trim(),
            lastname: data.lastname.trim(),
            email: data.email.trim(),
            password,
            phone: +data.phone,
          },
        },
      },
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong.");
  }
};
