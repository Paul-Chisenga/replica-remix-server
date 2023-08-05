import type { FC } from "react";
import type { InitProps } from "~/utils/types";

interface Props extends InitProps {
  title?: string;
}

const Card1: FC<Props> = ({ title, children, className }) => {
  return (
    <div className={`md:tw-p-7 tw-px-5 tw-py-4 box--shadow ${className}`}>
      {title && (
        <h5 className="tw-capitalize tw-font-cormorant tw-text-2xl tw-font-black tw-leading-6 tw-text-dark tw-mb-6 ">
          {title}
        </h5>
      )}
      {children}
    </div>
  );
};

export default Card1;
