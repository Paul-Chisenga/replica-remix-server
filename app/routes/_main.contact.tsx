import Breadcrumb from "~/components/common/Breadcrumb";
import ContactAddress from "~/components/contact/ContactAddress";
import ContactForm from "~/components/contact/ContactForm";
import ContactMap from "~/components/contact/ContactMap";

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
