import { useMapsLibrary, AdvancedMarker } from "@vis.gl/react-google-maps";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import type { InitProps, MyDistanceMatrix, MyPlaceResult } from "~/utils/types";
import DualRingLoader from "../indicators/DualRingLoader";

interface Props extends InitProps {
  origin: google.maps.LatLngLiteral | undefined;
  destination: google.maps.LatLngLiteral | undefined;
  mapQuerying?: boolean;
  draggable: boolean;
  showCost?: boolean;
  onChange?: (position: MyPlaceResult) => void;
}

const CustomerMarker: FC<Props> = ({
  origin,
  destination,
  mapQuerying,
  draggable,
  showCost,
  onChange,
}) => {
  const routesApi = useMapsLibrary("routes");
  const geocodingApi = useMapsLibrary("geocoding");
  const [dragging, setDragging] = useState(false);
  const [distanceMatrix, setDistanceMatrix] = useState<MyDistanceMatrix>();

  const handleDragEnd = async (e: google.maps.MapMouseEvent) => {
    const pos = { lat: e.latLng!.lat(), lng: e.latLng!.lng() };
    if (geocodingApi) {
      const geocoder = new geocodingApi.Geocoder();
      const res = await geocoder.geocode({ location: pos });
      if (onChange) {
        onChange({
          ...pos,
          name: res.results[0].formatted_address ?? "Unknow address name",
        });
      }
    } else {
      if (onChange) {
        onChange({ ...pos, name: "Unknow address name" });
      }
    }
    setDragging(false);
  };

  const calcDistanceAndDuration = useCallback(async () => {
    try {
      if (routesApi && destination && origin) {
        const result =
          await new routesApi.DistanceMatrixService().getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
          });
        if (
          result.rows.length > 0 &&
          result.rows[0].elements.length > 0 &&
          result.rows[0].elements[0].status === "OK"
        ) {
          setDistanceMatrix({
            duration: result.rows[0].elements[0].duration.text,
            distance: result.rows[0].elements[0].distance.text,
          });
        } else {
          alert("Could not calculate the duration.");
        }
      }
    } catch (error) {
      alert("An error occured, Could not calculate the duration.");
    }
  }, [origin, destination, routesApi]);

  useEffect(() => {
    calcDistanceAndDuration();
  }, [calcDistanceAndDuration]);

  if (!destination) {
    return null;
  }

  return (
    <AdvancedMarker
      position={destination}
      draggable={draggable}
      className=""
      onDrag={() => setDragging(true)}
      onDragEnd={handleDragEnd}
    >
      <div className="tw-flex tw-flex-col tw-items-center">
        <div
          className="tw-flex tw-rounded-xl px-2 tw-p-2 tw-bg-white tw-items-center tw-gap-2 tw-drop-shadow-md tw-border-gray-200"
          style={{ border: "1px solid" }}
        >
          <div className="tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-dark tw-rounded-lg">
            {!dragging && !mapQuerying ? (
              <i
                className={`tw-text-lg ${
                  dragging ? "bi bi-arrow-clockwise" : "bi bi-flag-fill"
                }`}
              ></i>
            ) : (
              <DualRingLoader size={15} />
            )}
          </div>
          {!dragging && !mapQuerying && (
            <div className="tw-text-dark">
              <span className="tw-inline-block tw-text-xs">
                {distanceMatrix?.duration}
              </span>
              {showCost && (
                <span className="tw-font-bold tw-text-sm tw-block">
                  ksh 100
                </span>
              )}
            </div>
          )}
        </div>
        <div
          className="tw-border-solid tw-border-gray-900 tw-z-10"
          style={{ height: 25, borderWidth: 1 }}
        />
        <div
          className="tw-rounded-full tw-bg-black/50 -tw-mb-2"
          style={{ height: 10, width: 10 }}
        />
      </div>
      <input
        type="hidden"
        name="distanceMatrix"
        value={JSON.stringify(distanceMatrix)}
      />
    </AdvancedMarker>
  );
};

export default CustomerMarker;
