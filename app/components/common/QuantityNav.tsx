import type { FC } from "react";
import { useState } from "react";
import type { InitProps } from "~/utils/types";

interface Props extends InitProps {
  onDecrement?: () => void;
  onIncrement?: () => void;
  noOfRequiredOptions: number;
}

const QuantityNav: FC<Props> = ({
  className,
  noOfRequiredOptions,
  onDecrement,
  onIncrement,
}) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div className={` tw-inline-flex d-flex align-items-center ${className}`}>
      {noOfRequiredOptions > 1 && count > 0 && (
        <>
          <button
            onClick={handleDecrement}
            type="button"
            disabled={count <= 0}
            className="quantity-nav-btn"
          >
            <i className="bi bi-dash"></i>
          </button>
          <span style={{ margin: "0 8px" }}>{count}</span>
        </>
      )}
      <button
        onClick={handleIncrement}
        type="button"
        disabled={noOfRequiredOptions === count}
        className="quantity-nav-btn"
      >
        <i
          className={
            noOfRequiredOptions === count ? "bi bi-check" : "bi bi-plus"
          }
        ></i>
      </button>
    </div>
  );
};

export default QuantityNav;
