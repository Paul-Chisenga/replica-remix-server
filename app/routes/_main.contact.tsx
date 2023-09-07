import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import Breadcrumb from "~/components/common/Breadcrumb";
import ContactAddress from "~/components/contact/ContactAddress";
import ContactForm from "~/components/contact/ContactForm";
import ContactMap from "~/components/contact/ContactMap";
import { sendEmail } from "~/services/email.server";

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
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
