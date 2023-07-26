import { Link } from "@remix-run/react";
import type { FC, ReactNode } from "react";

interface Props {
  to: string;
  children?: ReactNode;
  className?: string;
}

const LinkButton1: FC<Props> = ({ to, children, className }) => {
  return (
    <Link to={to} className={"primary-btn btn-md " + className}>
      {children}
    </Link>
  );
};

export default LinkButton1;
