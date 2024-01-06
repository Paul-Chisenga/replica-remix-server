import { Role } from "@prisma/client";
import {
  redirect,
  type LoaderArgs,
  type V2_MetaFunction,
} from "@remix-run/node";
import { Link } from "@remix-run/react";
import { hashPassword } from "~/services/bcrypt.server";
import { verifyToken } from "~/services/jwt";
import prisma from "~/services/prisma.server";
import { hasErrors, requiredFieldValidate } from "~/utils/helpers";

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
  return (
    <div className="container">
      <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-screen-sm tw-mx-auto">
        <div className="tw-px-2 tw-text-sm tw-text-emerald-500 tw-font-jost">
          Email verified{" "}
          <Link to="/login" className="tw-text-inherit tw-underline">
            Login
          </Link>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Register;

export async function loader({ request, params }: LoaderArgs) {
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
    "password",
  ]);
  if (hasErrors(errors)) {
    throw new Error("Invalid link");
  }

  try {
    const user = await prisma.profile.findUnique({
      where: { email: registrationPayload.email },
    });

    if (user) {
      return redirect("/login");
    }

    const password = await hashPassword(registrationPayload.password);
    await prisma.customer.create({
      data: {
        profile: {
          create: {
            role: Role.CUSTOMER,
            firstname: registrationPayload.firstname,
            lastname: registrationPayload.lastname,
            email: registrationPayload.email,
            password,
            phone: +registrationPayload.phone,
          },
        },
      },
    });

    return null;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}
