import { Form, useActionData, useNavigation } from "@remix-run/react";

const ContactForm = () => {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <div className="container">
      <div className="contact-form mb-120 mt-120">
        <div className="row d-flex align-items-center justify-content-center mb-40">
          <div className="col-lg-8">
            <div className="section-title text-center">
              <span>
                <img
                  className="left-vec"
                  src="/images/icon/sub-title-vec.svg"
                  alt="sub-title-vec"
                />
                Contact Us
                <img
                  className="right-vec"
                  src="/images/icon/sub-title-vec.svg"
                  alt="sub-title-vec"
                />
              </span>
              <h2>Get In Touch</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <Form action="" method="POST">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 mb-25">
                  <div className="form-inner">
                    <input
                      type="text"
                      placeholder="Name*"
                      name="name"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 mb-25">
                  <div className="form-inner">
                    <input
                      type="email"
                      placeholder="Email*"
                      name="email"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-inner">
                    <textarea
                      placeholder="Message ..."
                      name="message"
                      required
                    />
                  </div>
                </div>
                {actionData && actionData.errors && (
                  <div className="form-inner">
                    <label
                      htmlFor="vehicle"
                      className="tw-text-center tw-text-red-500"
                    >
                      Error, missing fields
                    </label>
                  </div>
                )}
                {actionData && actionData.success && (
                  <div className="form-inner">
                    <label
                      htmlFor="vehicle"
                      className="tw-text-center tw-text-primary"
                    >
                      Thank you for your message, We will reach out to you as
                      soon as possible
                    </label>
                  </div>
                )}
                <div className="mb-40"></div>
                {/* <div className="col-lg-12 mb-40">
                  <div className="form-inner2">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      defaultValue="Bike"
                    />
                    <label htmlFor="vehicle1">
                      Please save my name, email for the next time when I
                      comment.
                    </label>
                  </div>
                </div> */}
                <div className="col-lg-6 col-md-6">
                  <div className="form-inner">
                    <button type="submit">
                      {navigation.state !== "submitting"
                        ? "Send Message"
                        : "Submitting..."}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
