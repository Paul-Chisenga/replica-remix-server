import { Link } from "@remix-run/react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  to: string;
}

const LinkButton3: FC<Props> = ({ to, children }) => {
  return (
    <div className="discover-btn">
      <Link to={to} className="primary-btn7 btn-md2 tw-capitalize">
        <i className="bi bi-arrow-up-right-circle" />
        {children}
      </Link>
    </div>
  );
};

export default LinkButton3;
