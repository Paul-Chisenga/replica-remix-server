import { useState } from "react";
import ReactDatePicker from "react-datepicker";

const ReservationForm = () => {
  const [startDate1, setStartDate1] = useState<Date | null>(null);

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
            <form>
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 mb-25">
                  <div className="form-inner">
                    <input type="text" placeholder="Name*" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 mb-25">
                  <div className="form-inner">
                    <input type="text" placeholder="Phone*" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 mb-25">
                  <div className="form-inner">
                    <input type="text" placeholder="People" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 mb-25">
                  <div className="form-inner date-icon">
                    <ReactDatePicker
                      selected={startDate1}
                      onChange={(date) => setStartDate1(date)}
                      placeholderText="Check In"
                      className="claender"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 mb-25">
                  <div className="form-inner">
                    <select className="time-select">
                      <option value="time">08 : 00 am</option>
                      <option>09 : 00 am</option>
                      <option value={1}>10 : 00 am</option>
                      <option value={2}>11 : 00 am</option>
                      <option value={3}>12 : 00 pm</option>
                      <option value={4}>01 : 00 pm</option>
                      <option value={5}>02 : 00 pm</option>
                      <option value={6}>03 : 00 pm</option>
                      <option value={7}>04 : 00 pm</option>
                      <option value={8}>05 : 00 pm</option>
                      <option value={9}>06 : 00 pm</option>
                      <option value={10}>07 : 00 pm</option>
                      <option value={11}>08 : 00 pm</option>
                      <option value={12}>09 : 00 pm</option>
                      <option value={13}>10 : 00 pm</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 sm-mb-25">
                  <div className="form-inner">
                    <input type="email" placeholder="Email" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-inner">
                    <button type="submit">Reserve Now</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
