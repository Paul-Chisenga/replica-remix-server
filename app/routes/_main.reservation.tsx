/* eslint-disable jsx-a11y/anchor-is-valid */
import ReservationForm from "~/components/category/ReservationForm";
import Breadcrumb from "~/components/common/Breadcrumb";
import datePickerCss from "react-datepicker/dist/react-datepicker.css";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";

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
