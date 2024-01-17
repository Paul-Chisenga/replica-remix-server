import type { FC } from "react";
import type { InitProps } from "~/utils/types";

interface Props extends InitProps {
  count: number;
  onAdd: () => void;
  onRemove: () => void;
}

const DynamicFieldWrapper: FC<Props> = ({
  children,
  count,
  onAdd,
  onRemove,
  className,
}) => {
  return (
    <div className={`${className}`}>
      <>{children}</>
      <div className="tw-flex tw-items-center tw-gap-4">
        <button
          type={"button"}
          className="tw-h-8 tw-w-8 tw-flex tw-items-center tw-justify-center hover:tw-opacity-90 tw-bg-primary tw-rounded-full tw-text-white"
          onClick={onRemove}
        >
          <i className="bi bi-dash tw-text-2xl tw-leading-none"></i>
        </button>

        <div className="tw-text-dark tw-text-xl">{count}</div>
        <button
          type={"button"}
          className="tw-h-8 tw-w-8 tw-flex tw-items-center tw-justify-center hover:tw-opacity-90 tw-bg-primary tw-rounded-full tw-text-white"
          onClick={onAdd}
        >
          <i className="bi bi-plus tw-text-2xl tw-leading-none"></i>
        </button>
      </div>
    </div>
  );
};

export default DynamicFieldWrapper;
