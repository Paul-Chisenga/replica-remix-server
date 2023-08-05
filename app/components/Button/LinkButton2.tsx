import { Link } from "@remix-run/react";
import type { FC, ReactNode } from "react";

interface Props {
  to: string;
  children?: ReactNode;
  className?: string;
}

const LinkButton2: FC<Props> = ({ to, children, className }) => {
  return (
    <Link
      to={to}
      className={
        "primary-btn8 lg--btn btn-primary-fill tw-text-white " + className
      }
    >
      {children}
    </Link>
  );
};

export default LinkButton2;
