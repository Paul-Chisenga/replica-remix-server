import nodemailer from "nodemailer";

/*
    EMAIL WITH NODEMAILER AND AWS
*/
const transport = nodemailer.createTransport({
  host: "smtp.mail.us-east-1.awsapps.com",
  secure: true,
  requireTLS: true,
  port: 465,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.AWS_EMAIL ?? "",
    pass: process.env.AWS_EMAIL_PASSWORD ?? "",
  },
  from: process.env.AWS_EMAIL ?? "",
});

export async function sendEmail(email: {
  to: { name?: string; email: string };
  subject: string;
  message: string;
}) {
  await new Promise((resolve, reject) => {
    transport.sendMail(
      {
        from: "contact@replicabakeryandcafe.com",
        to: email.to.email,
        // cc: (email.to.name ?? "") + ` <${email.to.email}>`,
        subject: email.subject,
        html: email.message,
      },
      (err, info) => {
        if (err) {
          console.log("EMAIL NO SENT");
          reject(err);
        } else {
          console.log("EMAIL SENT");
          resolve("Email sent");
        }
      }
    );
  });
}
