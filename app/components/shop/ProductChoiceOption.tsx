import type { FC } from "react";
import { useCallback, useState, useEffect } from "react";
import type { InitProps } from "~/utils/types";

type Option = {
  id: number;
  label: string;
};

interface Props extends InitProps {
  option: Option;
  noOfRequiredOptions: number;
  selectionFull: boolean;
  selected?: {
    count: number;
  };
  onDecrement: (option: Option) => void;
  onIncrement: (option: Option) => void;
}

const ProductChoiceOption: FC<Props> = ({
  option,
  noOfRequiredOptions,
  selectionFull,
  selected,
  onDecrement,
  onIncrement,
}) => {
  const [count, setCount] = useState(selected?.count ?? 0);

  const handleIncrement = useCallback(() => {
    if (!selectionFull) {
      setCount((prev) => prev + 1);
      onIncrement(option);
    }
  }, [onIncrement, option, selectionFull]);

  const handleDecrement = useCallback(() => {
    if (count > 0) {
      setCount((prev) => prev - 1);
      onDecrement(option);
    }
  }, [count, onDecrement, option]);

  useEffect(() => {});

  return (
    <div className="tw-flex tw-justify-between tw-gap-8 tw-flex-nowrap">
      <span
        className={`tw-transition-opacity tw-duration-300 ${
          selectionFull && count === 0 && "tw-opacity-50"
        }`}
      >
        {option.label}
      </span>
      <div className="tw-inline-flex d-flex align-items-center">
        {noOfRequiredOptions > 1 && count > 0 && (
          <>
            <button
              onClick={handleDecrement}
              type="button"
              disabled={count <= 0 || !!selected}
              className="quantity-nav-btn"
            >
              <i className="bi bi-dash"></i>
            </button>
            <span style={{ margin: "0 8px" }}>{count}</span>
          </>
        )}
        <button
          onClick={
            selectionFull && noOfRequiredOptions === 1
              ? handleDecrement
              : handleIncrement
          }
          type="button"
          disabled={(selectionFull && noOfRequiredOptions > 1) || !!selected}
          className={`quantity-nav-btn tw-transition-colors tw-duration-300 ${
            selectionFull && count === 0 && "tw-bg-gray-200"
          }`}
        >
          <i
            className={
              (selectionFull && count > 0) || !!selected
                ? "bi bi-check"
                : "bi bi-plus"
            }
          ></i>
        </button>
      </div>
    </div>
  );
};

export default ProductChoiceOption;
