import { AdvancedMarker } from "@vis.gl/react-google-maps";
import type { FC } from "react";
import type { InitProps } from "~/utils/types";

interface Props extends InitProps {
  position: google.maps.LatLngLiteral | undefined;
}

const RiderMarker: FC<Props> = ({ position }) => {
  if (!position) {
    return null;
  }
  return (
    <AdvancedMarker position={position} className="">
      <img src="/images/rider-bike.png" alt="" width={50} />
    </AdvancedMarker>
  );
};

export default RiderMarker;
