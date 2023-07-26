import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Button2: FC<Props> = ({ children }) => {
  return (
    <button
      type="submit"
      className="primary-btn8 lg--btn btn-primary-fill tw-block tw-w-full"
    >
      {children}
    </button>
  );
};

export default Button2;
