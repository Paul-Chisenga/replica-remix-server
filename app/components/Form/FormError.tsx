import type { FC } from "react";

interface Props {
  message?: string;
}

const FormError: FC<Props> = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div className="tw-px-2 tw-text-sm tw-text-red-500 tw-font-jost">
      {message}
    </div>
  );
};

export default FormError;
