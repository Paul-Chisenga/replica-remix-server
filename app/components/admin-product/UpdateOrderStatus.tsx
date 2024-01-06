import { useFetcher } from "@remix-run/react";
import type { FC } from "react";
import type { InitProps } from "~/utils/types";
import DualRingLoader from "../indicators/DualRingLoader";

interface Props extends InitProps {
  orderId: string;
}

const UpdateOrderStatus: FC<Props> = ({ orderId }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action={`${orderId}/change-status`} method="POST">
      <button
        type="submit"
        className="tw-bg-transparent tw-opacity-70 tw-underline tw-text-sm hover:tw-text-primary focus:tw-text-primary tw-transition-colors tw-duration-200"
        disabled={fetcher.state === "submitting"}
      >
        <span>Change status to preparing</span>
        {fetcher.state === "submitting" && <DualRingLoader size={15} />}
      </button>
    </fetcher.Form>
  );
};

export default UpdateOrderStatus;
