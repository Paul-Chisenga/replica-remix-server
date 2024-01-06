import type { FC } from "react";
import type { InitProps } from "~/utils/types";

interface Props extends InitProps {}

const FormSuccess: FC<Props> = ({ children }) => {
  if (!children) {
    return null;
  }
  return (
    <div className="tw-px-2 tw-text-sm tw-text-emerald-500 tw-font-jost">
      {children}
    </div>
  );
};

export default FormSuccess;
