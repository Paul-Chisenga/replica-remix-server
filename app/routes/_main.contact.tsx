import type { V2_MetaFunction } from "@remix-run/node";
import Breadcrumb from "~/components/common/Breadcrumb";
import ContactAddress from "~/components/contact/ContactAddress";
import ContactForm from "~/components/contact/ContactForm";
import ContactMap from "~/components/contact/ContactMap";

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
