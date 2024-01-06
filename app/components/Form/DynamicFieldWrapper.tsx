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
    <div className={`tw-flex tw-items-end tw-gap-1 ${className}`}>
      <div className="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-justify-end tw-bg-primary tw-rounded-tl-xl tw-rounded-br-xl">
        <button
          type={"button"}
          className="tw-bg-transparent tw-rounded-tl-xl tw-rounded-br-xl tw-border-solid tw-border tw-border-white/30 tw-text-white tw-block tw-px-2"
          onClick={onRemove}
        >
          <i className="bi bi-dash tw-text-lg"></i>
        </button>

        <div className="tw-text-white">{count}</div>
        <button
          type={"button"}
          className="tw-bg-transparent tw-rounded-tl-xl tw-rounded-br-xl tw-border-solid tw-border tw-border-white/30 tw-text-white tw-block tw-px-2"
          onClick={onAdd}
        >
          <i className="bi bi-plus tw-text-lg"></i>
        </button>
      </div>
      <div className="tw-flex-1">{children}</div>
    </div>
  );
};

export default DynamicFieldWrapper;
