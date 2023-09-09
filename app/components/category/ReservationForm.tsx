import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";

const ReservationForm = () => {
  const actionData = useActionData();
  const [startDate1, setStartDate1] = useState<Date | null>(null);

  const navigation = useNavigation();

  return (
    <div className="container">
      <div className="reservation-1 mb-120 mt-120">
        <div className="row d-flex align-items-center justify-content-center mb-40">
          <div className="col-lg-8">
            <div className="section-title text-center">
              <span>
                <img
                  className="left-vec"
                  src="/images/icon/sub-title-vec.svg"
                  alt="sub-title-vec"
                />
                Online Reserve
                <img
                  className="right-vec"
                  src="/images/icon/sub-title-vec.svg"
                  alt="sub-title-vec"
                />
              </span>
              <h2>For Online Reservation</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <Form action="/reservation" method="POST">
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
                      type="text"
                      placeholder="Phone*"
                      name="phone"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 mb-25">
                  <div className="form-inner">
                    <input
                      type="number"
                      placeholder="People*"
                      name="people"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 mb-25">
                  <div className="form-inner date-icon">
                    <ReactDatePicker
                      selected={startDate1}
                      onChange={(date) => setStartDate1(date)}
                      placeholderText="Check In*"
                      className="claender"
                      name="date"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 mb-25">
                  <div className="form-inner">
                    <select className="time-select" required name="time">
                      <option value={""}>Time*</option>
                      <option value={"08 : 00 am"}>08 : 00 am</option>
                      <option value={"09 : 00 am"}>09 : 00 am</option>
                      <option value={"10 : 00 am"}>10 : 00 am</option>
                      <option value={"11 : 00 am"}>11 : 00 am</option>
                      <option value={"12 : 00 pm"}>12 : 00 pm</option>
                      <option value={"01 : 00 pm"}>01 : 00 pm</option>
                      <option value={"02 : 00 pm"}>02 : 00 pm</option>
                      <option value={"03 : 00 pm"}>03 : 00 pm</option>
                      <option value={"04 : 00 pm"}>04 : 00 pm</option>
                      <option value={"05 : 00 pm"}>05 : 00 pm</option>
                      <option value={"06 : 00 pm"}>06 : 00 pm</option>
                      <option value={"07 : 00 pm"}>07 : 00 pm</option>
                      <option value={"08 : 00 pm"}>08 : 00 pm</option>
                      <option value={"09 : 00 pm"}>09 : 00 pm</option>
                      <option value={"10 : 00 pm"}>10 : 00 pm</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 sm-mb-25">
                  <div className="form-inner">
                    <input type="email" placeholder="Email" name="email" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  {actionData && actionData.errors && (
                    <div className="form-inner2">
                      <label
                        htmlFor="vehicle"
                        className="tw-text-center tw-text-red-500"
                      >
                        Error, missing fields
                      </label>
                    </div>
                  )}
                  {actionData && actionData.success && (
                    <div className="col-lg-12 mb-40">
                      <div className="form-inner2">
                        <label
                          htmlFor="vehicle"
                          className="tw-text-center tw-text-primary"
                        >
                          Reservation successfully submitted, We will reach out
                          soon for confirmation
                        </label>
                      </div>
                    </div>
                  )}
                  <div className="col-lg-12 mb-40">
                    <div className="form-inner2">
                      <label htmlFor="vehicle" className="tw-text-center">
                        Please not that your reservation will be canceled 15
                        minutes past the reservation time{" "}
                      </label>
                    </div>
                  </div>
                  <div className="form-inner">
                    <button type="submit">
                      {navigation.state !== "submitting"
                        ? "Reserve Now"
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

export default ReservationForm;
