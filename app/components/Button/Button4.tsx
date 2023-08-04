import type { FC } from "react";
import type { InitProps } from "~/utils/types";

interface Props extends InitProps {
  onClick?: () => void;
}

const Button4: FC<Props> = ({ children, className, onClick }) => {
  return (
    <button
      type="submit"
      className={"primary-btn3 " + className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button4;
