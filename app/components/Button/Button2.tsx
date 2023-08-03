import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Button2: FC<Props> = ({ children, className }) => {
  return (
    <button
      type="submit"
      className={
        "primary-btn8 lg--btn btn-primary-fill tw-block tw-w-full " + className
      }
    >
      {children}
    </button>
  );
};

export default Button2;
