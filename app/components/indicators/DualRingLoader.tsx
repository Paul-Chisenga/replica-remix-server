import type { FC } from "react";
import type { InitProps } from "~/utils/types";

interface Props extends InitProps {
  size: number;
}
const DualRingLoader: FC<Props> = ({ size, className }) => {
  return (
    <div
      className={`lds-dual-ring tw-mx-2 after:tw-content-[''] after:tw-w-[15px] after:tw-h-[15px] after:[border-width:1px] ${className}`}
      data-size={`${size}`}
    ></div>
  );
};

export default DualRingLoader;
