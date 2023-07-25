/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";

const ContactMap = () => {
  return (
    <div className="contact-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.9189528724123!2d36.7972872110524!3d-1.2165719987666899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3d5eef234b95%3A0xac9e573f43fe5923!2sRosslyn%20Riviera%20Mall!5e0!3m2!1sen!2sve!4v1690287959429!5m2!1sen!2sve"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default ContactMap;
