import type { FC } from "react";
import type { InitProps } from "~/utils/types";

interface Props extends InitProps {}

const DashboardPageHeader: FC<Props> = ({ className, children }) => {
  return (
    <h1 className={`tw-text-xl tw-font-bold tw-text-black mb-30 ${className}`}>
      {children}
    </h1>
  );
};

export default DashboardPageHeader;
