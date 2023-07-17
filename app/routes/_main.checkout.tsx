/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from "react";
import { useReducer } from "react";
import Breadcrumb from "~/components/common/Breadcrumb";

const initialState = { count: 1 };

function reducer(state: any, action: any) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
const MyComponent: FC<{ price: number }> = ({ price }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increment = () => {
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    if (state.count > 1) {
      dispatch({ type: "decrement" });
    }
  };

  return (
    <>
      <div className="product-total d-flex align-items-center">
        <div className="quantity">
          <div className="quantity d-flex align-items-center">
            <div className="quantity-nav nice-number d-flex align-items-center">
              <button onClick={decrement} type="button">
                <i className="bi bi-dash"></i>
              </button>
              <span style={{ margin: "0 8px" }}>{state.count}</span>
              <button onClick={increment} type="button">
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <strong>
          <i className="bi bi-x-lg px-2" />
          <span className="product-price">${state.count * price}</span>
        </strong>
      </div>
    </>
  );
};

function Checkout() {
  return (
    <>
      <Breadcrumb pageName="Checkout" pageTitle="Checkout" />
      <div className="checkout-section pt-120 pb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="form-wrap box--shadow mb-30">
                <h4 className="title-25 mb-20">Billing Details</h4>
                <form>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-inner">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your first name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-inner">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Country / Region</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your country name"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Street Address</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="House and street name"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <select style={{ appearance: "none" }}>
                          <option>Town / City</option>
                          <option>Dhaka</option>
                          <option>Saidpur</option>
                          <option>Newyork</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <input
                          type="text"
                          name="fname"
                          placeholder="Post Code"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Additional Information</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your Phone Number"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email Address"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <input
                          type="text"
                          name="postcode"
                          placeholder="Post Code"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <textarea
                          name="message"
                          placeholder="Order Notes (Optional)"
                          rows={6}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="form-wrap box--shadow">
                <h4 className="title-25 mb-20">Ship to a Different Address?</h4>
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your first name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <textarea
                          name="message"
                          placeholder="Order Notes (Optional)"
                          rows={3}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <aside className="col-lg-5">
              <div className="added-product-summary mb-30">
                <h5 className="title-25 checkout-title">Order Summary</h5>
                <ul className="added-products">
                  <li className="single-product d-flex justify-content-start">
                    <div className="product-img">
                      <img src="/images/bg/cart-01.png" alt="" />
                    </div>
                    <div className="product-info">
                      <h5 className="product-title">
                        <a href="#">Organic Vegetable grains</a>
                      </h5>
                      <MyComponent price={22.5} />
                    </div>
                    <div className="delete-btn">
                      <i className="bi bi-x-lg" />
                    </div>
                  </li>
                  <li className="single-product d-flex justify-content-start">
                    <div className="product-img">
                      <img src="/images/bg/cart-02.png" alt="" />
                    </div>
                    <div className="product-info">
                      <h5 className="product-title">
                        <a href="#">Fresh Vegetable Eggplant</a>
                      </h5>
                      <MyComponent price={35} />
                    </div>
                    <div className="delete-btn">
                      <i className="bi bi-x-lg" />
                    </div>
                  </li>
                  <li className="single-product d-flex justify-content-start">
                    <div className="product-img">
                      <img src="/images/bg/cart-03.png" alt="" />
                    </div>
                    <div className="product-info">
                      <h5 className="product-title">
                        <a href="#">Fresh Vegetable Eggplant</a>
                      </h5>
                      <MyComponent price={30} />
                    </div>
                    <div className="delete-btn">
                      <i className="bi bi-x-lg" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="summery-card cost-summery mb-30">
                <table className="table cost-summery-table">
                  <thead>
                    <tr>
                      <th>Subtotal</th>
                      <th>$128.70</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="tax">Tax</td>
                      <td>$5</td>
                    </tr>
                    <tr>
                      <td>Total ( tax excl.)</td>
                      <td>$15</td>
                    </tr>
                    <tr>
                      <td>Total ( tax incl.)</td>
                      <td>$15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="summery-card total-cost mb-30">
                <table className="table cost-summery-table total-cost">
                  <thead>
                    <tr>
                      <th>Total</th>
                      <th>$162.70</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <form className="payment-form">
                <div className="payment-methods mb-50">
                  <div className="form-check payment-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Check payments
                    </label>
                    <p className="para">
                      Please send a check to Store Name, Store Street, Store
                      Town, Store State / County, Store Postcode.
                    </p>
                  </div>
                  <div className="form-check payment-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Cash on delivery
                    </label>
                    <p className="para">Pay with cash upon delivery.</p>
                  </div>
                  <div className="form-check payment-check paypal d-flex flex-wrap align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault3"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault3"
                    >
                      PayPal
                    </label>
                    <img src="/images/bg/payonert.png" alt="" />
                    <a href="#" className="about-paypal">
                      What is PayPal
                    </a>
                  </div>
                  <div className="payment-form-bottom d-flex align-items-start">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                      I have read and agree to the website <br />
                      <a href="#">Terms and conditions</a>
                    </label>
                  </div>
                </div>
                <div className="place-order-btn">
                  <button type="submit" className="primary-btn8 lg--btn">
                    Place Order
                  </button>
                </div>
              </form>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
