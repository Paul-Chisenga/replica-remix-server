import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import Breadcrumb from "~/components/common/Breadcrumb";
import ContactAddress from "~/components/contact/ContactAddress";
import ContactForm from "~/components/contact/ContactForm";
import ContactMap from "~/components/contact/ContactMap";
import { sendEmail } from "~/services/email.server";
<<<<<<< HEAD
=======
import prisma from "~/services/prisma.server";
import {
  invariantValidate,
  requiredFieldValidate,
  hasErrors,
} from "~/utils/helpers";
import { MyObject } from "~/utils/types";
>>>>>>> e88ae82

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Contact us - Replica restaurant" },
    {
      name: "description",
      content: "When you look for us you will find replica!",
    },
  ];
};

const Contact = () => {
  return (
    <>
      <Breadcrumb pageName="Contact Us" pageTitle="Contact Us" />
      <ContactAddress />
      <ContactForm />
      <ContactMap />
    </>
  );
};

export default Contact;
<<<<<<< HEAD

export async function action({ request }: ActionArgs) {
  try {
    await sendEmail({
      to: { name: "Paul", email: "paulchisenga.p@gmail.com" },
      subject: `RESERVATION`,
      message: `
    Dear ${"Paul"}
    <br >
    Heyloo bala badld
    `,
    });
    return "OK";
=======
export async function action({ request }: ActionArgs) {
  if (request.method !== "POST") {
    throw new Error("Bad Request");
  }
  const data = Object.fromEntries(await request.formData()) as MyObject<string>;

  //
  invariantValidate(data);

  //
  const errors = requiredFieldValidate(data, ["name", "email", "message"]);
  if (hasErrors(errors)) {
    return { errors };
  }

  try {
    // Sendmail to admin
    await sendEmail({
      to: {
        name: process.env.ADMIN_NAME as string,
        email: process.env.ADMIN_EMAIL as string,
      },
      subject: "CONATCT FORM REPLICA",
      message: `
        <p>Name : ${data.name}</p>
        <p>Message : <br /> ${data.message}</p>
      `,
    });
    return { success: true };
>>>>>>> e88ae82
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
