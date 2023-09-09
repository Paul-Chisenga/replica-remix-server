/* eslint-disable jsx-a11y/anchor-is-valid */
import ReservationForm from "~/components/category/ReservationForm";
import Breadcrumb from "~/components/common/Breadcrumb";
import datePickerCss from "react-datepicker/dist/react-datepicker.css";
import type {
  ActionArgs,
  LinksFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import {
  formatDate,
  hasErrors,
  invariantValidate,
  requiredFieldValidate,
} from "~/utils/helpers";
import prisma from "~/services/prisma.server";
import type { MyObject } from "~/utils/types";
import { sendEmail } from "~/services/email.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: datePickerCss },
];

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Reservation - Replica restaurant" },
    {
      name: "description",
      content:
        "Reserve a table or two or more for a private event or public alike at replica!",
    },
  ];
};

const Reservation = () => {
  return (
    <>
      <Breadcrumb pageName="Reservation" pageTitle="Reservation" />
      <div>
        <ReservationForm />
      </div>
    </>
  );
};

export default Reservation;

export async function action({ request }: ActionArgs) {
  if (request.method !== "POST") {
    throw new Error("Bad Request");
  }
  const data = Object.fromEntries(await request.formData()) as MyObject<string>;

  //
  invariantValidate(data);

  //
  const errors = requiredFieldValidate(data, [
    "name",
    "phone",
    "time",
    "date",
    "people",
  ]);
  if (hasErrors(errors)) {
    return { errors };
  }
  try {
    await prisma.$transaction(async (tx) => {
      const reservation = await tx.reservation.create({
        data: {
          name: data.name.trim(),
          date: new Date(data.date),
          people: +data.people,
          phone: +data.phone,
          time: data.time.trim(),
          email: data.email ?? undefined,
        },
      });

      // Sendmail to admin
      await sendEmail({
        to: {
          name: process.env.ADMIN_NAME as string,
          email: process.env.ADMIN_EMAIL as string,
        },
        subject: "NEW RESERVATION REPLICA",
        message: `
            <p>Name : ${reservation.name}</p>
            <p>phone Number : 0${reservation.phone}</p>
            <p>Email Address : ${reservation.email}</p>
            <p>Date : ${formatDate(reservation.date)}</p>
            <p>Time : ${reservation.time}</p>
            <p>Number of people : ${reservation.people}</p>
          `,
      });
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
