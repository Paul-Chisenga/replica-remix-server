import { useFetcher } from "@remix-run/react";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import type { InitProps, MyPlaceResult } from "~/utils/types";

interface Props extends InitProps {
  watch?: boolean;
  onChange?: (position: MyPlaceResult) => void;
}

const LocationTracker: FC<Props> = ({ onChange, watch }) => {
  const [trackerId, setTrackerId] = useState<number>();

  const fetcher = useFetcher();

  const handleLocationError = () => {
    alert();
  };

  const handleGetLocation = useCallback(() => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      const TrackerId = navigator.geolocation.watchPosition(
        async (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          fetcher.submit(
            { location: pos },
            {
              action: "update-location",
              method: "POST",
              encType: "application/json",
            }
          );
          if (onChange) {
            onChange({
              ...pos,
              name: "Unknow",
            });
          }
        },
        () => {
          handleLocationError();
        },
        {
          maximumAge: 0,
          enableHighAccuracy: true,
        }
      );
      setTrackerId(TrackerId);
    } else {
      alert("Your browser does not support the location feature.");
      handleLocationError();
    }
  }, [onChange]);

  useEffect(() => {
    if (watch) {
      handleGetLocation();
    }
  }, [handleGetLocation, watch]);

  useEffect(() => {
    return () => {
      if (trackerId) {
        navigator.geolocation.clearWatch(trackerId);
      }
    };
  }, [trackerId]);

  return <></>;
};

export default LocationTracker;
