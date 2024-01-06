import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
  MapControl,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import type { FC } from "react";
import { useCallback, useEffect, useState, useRef } from "react";
import type { MyDistanceMatrix, MyPlaceResult } from "~/utils/types";
import { REPLICA_POSITION, MAP_ID } from "~/utils/types";
import MyForm from "../Form/MyForm";
import DualRingLoader from "../indicators/DualRingLoader";

interface AutoCompleteProps {
  position: MyPlaceResult | undefined;
  inputValue: string;
  onChange: (value: string) => void;
  onLocationChanged: (location: MyPlaceResult) => void;
}

const Autocomplete: FC<AutoCompleteProps> = ({
  inputValue,
  onChange,
  onLocationChanged,
}) => {
  const placesApi = useMapsLibrary("places");
  const inputRef = useRef<HTMLInputElement>(null);

  const onPlaceChanged = useCallback(
    (autocomplete: google.maps.places.Autocomplete) => {
      const place = autocomplete.getPlace();
      onLocationChanged({
        lat: place.geometry!.location!.lat(),
        lng: place.geometry!.location!.lng(),
        name: place.formatted_address ?? place.name ?? "Unknow address name",
      });
      // Keep focus on input element
      // inputRef.current && inputRef.current.focus();
    },
    [onLocationChanged]
  );

  const handleInputChange = (event: any) => {
    onChange(event.target.value);
  };

  const bindAutocompleteWidget = useCallback(() => {
    if (placesApi && inputRef && inputRef.current) {
      const autocomplete = new placesApi.Autocomplete(inputRef.current, {
        fields: ["place_id", "geometry", "name"],
      });

      autocomplete.addListener(
        "place_changed",
        onPlaceChanged.bind(this, autocomplete)
      );
    }
  }, [onPlaceChanged, placesApi]);

  useEffect(() => {
    bindAutocompleteWidget();
  }, [bindAutocompleteWidget]);

  return (
    <div className="tw-flex tw-items-center tw-rounded-full tw-bg-gray-100 tw-overflow-hidden">
      <i className="bi bi-search tw-ml-4"></i>
      <input
        type="text"
        className="tw-block tw-px-5 tw-py-0 tw-leading-10 tw-flex-auto tw-transition-all tw-text-sm tw-text-[#848484] tw-font-jost tw-bg-gray-100"
        placeholder="Search for an address"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
      />
      {/* <button
        type="button"
        onClick={onToggleMap}
        className="tw-bg-white tw-rounded-full tw-text-sm tw-text-dark tw-px-3 tw-py-1 tw-my-1 tw-mx-2 focus:tw-ring-0 focus:tw-outline-none hover:tw-shadow-sm"
      >
        Map
      </button> */}
    </div>
  );
};

interface MarkerProps {
  position: google.maps.LatLngLiteral | undefined;
  mapQuerying?: boolean;
  onChange: (position: MyPlaceResult) => void;
}

const Marker: FC<MarkerProps> = ({ position, mapQuerying, onChange }) => {
  const routesApi = useMapsLibrary("routes");
  const geocodingApi = useMapsLibrary("geocoding");
  const [dragging, setDragging] = useState(false);
  const [distanceMatrix, setDistanceMatrix] = useState<MyDistanceMatrix>();

  const handleDragEnd = async (e: google.maps.MapMouseEvent) => {
    const pos = { lat: e.latLng!.lat(), lng: e.latLng!.lng() };
    if (geocodingApi) {
      const geocoder = new geocodingApi.Geocoder();
      const res = await geocoder.geocode({ location: pos });
      onChange({
        ...pos,
        name: res.results[0].formatted_address ?? "Unknow address name",
      });
    } else {
      onChange({ ...pos, name: "Unknow address name" });
    }
    setDragging(false);
  };

  const calcDistanceAndDuration = useCallback(async () => {
    try {
      if (routesApi && position) {
        const result =
          await new routesApi.DistanceMatrixService().getDistanceMatrix({
            origins: [REPLICA_POSITION],
            destinations: [position],
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
  }, [position, routesApi]);

  useEffect(() => {
    calcDistanceAndDuration();
  }, [calcDistanceAndDuration]);

  return (
    <AdvancedMarker
      position={position}
      draggable={true}
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
                {distanceMatrix?.duration} ride
              </span>
              <span className="tw-font-bold tw-text-sm tw-block">ksh 100</span>
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

interface CurrentLocationProps {
  isQueryingLocation?: () => void;
  locationQueried?: () => void;
  onChange: (e: MyPlaceResult) => void;
}
const CurrentLocation: FC<CurrentLocationProps> = ({
  onChange,
  isQueryingLocation,
  locationQueried,
}) => {
  const [querying, setQuerying] = useState(false);
  const geocodingApi = useMapsLibrary("geocoding");

  const handleLocationError = () => {
    alert();
  };
  const handleGetLocation = () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          setQuerying(true);
          if (isQueryingLocation) {
            isQueryingLocation();
          }
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          if (geocodingApi) {
            const geocoder = new geocodingApi.Geocoder();
            const res = await geocoder.geocode({ location: pos });
            onChange({
              ...pos,
              name: res.results[0].formatted_address ?? "Unknow address name",
            });
          } else {
            onChange({ ...pos, name: "Unknow address name" });
          }
          setQuerying(false);
          if (locationQueried) {
            locationQueried();
          }
        },
        () => {
          setQuerying(false);
          if (locationQueried) {
            locationQueried();
          }
          alert("Could not get your location, try again later.");
          handleLocationError();
        }
      );
    } else {
      alert("Your browser does not support the location feature.");
      handleLocationError();
    }
  };
  return (
    <button
      type="button"
      onClick={handleGetLocation}
      className="tw-bg-transparent sm:tw-text-sm focus:tw-outline-none tw-border-primary tw-items-center focus:tw-border-none focus:tw-ring-0 tw-text-primary tw-rounded-md tw-font-medium tw-flex tw-gap-2 tw-transition-colors focus:tw-bg-emerald-50 tw-duration-300 hover:tw-bg-emerald-50 tw-px-4 tw-py-1"
      // style={{ border: "1px solid" }}
    >
      <i className="bi bi-geo-fill"></i>
      <span>Use my location</span>
      {querying && <DualRingLoader size={15} />}
    </button>
  );
};

interface CenterMapProps {
  position: MyPlaceResult | undefined;
}

const CenterMap: FC<CenterMapProps> = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (map && position) {
      map.panTo(position);
      // map.setZoom(20);
    }
  }, [map, position]);
  return <></>;
};

// DIRECTION API
// interface DirectionProps {
//   position: MyPlaceResult | undefined;
// }

// const Direction: FC<DirectionProps> = ({ position }) => {
//   const { directionsService, directionsRenderer } = useDirectionsService({
//     renderOnMap: true,
//     renderOptions: {
//       markerOptions: { opacity: 0.0 },
//       polylineOptions: { strokeColor: "black" },
//     },
//   });

//   useEffect(() => {
//     if (directionsService && position) {
//       directionsService
//         .route({
//           origin: REPLICA_POSITION,
//           destination: position,
//           travelMode: google.maps.TravelMode.DRIVING,
//         })
//         .then((res) => {
//           directionsRenderer?.setDirections(res);
//         })
//         .catch(() => {
//           alert("Error creating directions");
//         });
//     }
//   }, [directionsRenderer, directionsService, position]);
//   return <></>;
// };

interface Props {
  API_KEY: string;
  userShippingAddress?: MyPlaceResult;
  shippingAddressExtra?: string;
}
const DeliveryAddress: FC<Props> = ({
  API_KEY,
  userShippingAddress,
  shippingAddressExtra,
}) => {
  const [location, setLocation] = useState<MyPlaceResult | undefined>(
    userShippingAddress
  );
  const [autocompleteInputValue, setAutocompleteInputValue] = useState(
    userShippingAddress?.name ?? ""
  );
  const [querying, setQuerying] = useState(false);

  const handleLocationChange = (place: MyPlaceResult) => {
    setLocation(place);
    setAutocompleteInputValue(place.name);
  };

  return (
    <div>
      <h1 className="tw-font-bold tw-text-lg mb-6 tw-text-dark">
        Delivery address
      </h1>

      <APIProvider apiKey={API_KEY}>
        {/* {showMap && ( */}
        <div
          className="tw-mb-8 tw-rounded-lg tw-overflow-hidden"
          style={{ height: 400 }}
        >
          <Map
            zoom={18}
            center={REPLICA_POSITION}
            disableDefaultUI={true}
            fullscreenControl
            mapId={MAP_ID}
          >
            <MapControl position={ControlPosition.BOTTOM_CENTER}>
              <div
                style={{ border: "1px solid" }}
                className="tw-mb-4 tw-border-gray-300 tw-bg-white/95 tw-rounded-xl tw-drop-shadow-lg tw-p-4 sm:tw-w-[100vh] sm:tw-max-w-md tw-space-y-4"
              >
                <Autocomplete
                  position={location}
                  inputValue={autocompleteInputValue}
                  onChange={setAutocompleteInputValue}
                  onLocationChanged={handleLocationChange}
                />
                <CurrentLocation
                  onChange={handleLocationChange}
                  isQueryingLocation={() => setQuerying(true)}
                  locationQueried={() => setQuerying(false)}
                />
              </div>
            </MapControl>

            <CenterMap position={location} />
            <Marker
              position={location}
              onChange={handleLocationChange}
              mapQuerying={querying}
            />
            {/* <Direction position={location} /> */}
          </Map>
        </div>
        {/* )} */}
      </APIProvider>
      {location && (
        <div>
          <h1 className="tw-font-bold tw-text-xl mb-6 tw-text-dark">
            {location.name}
          </h1>
          <MyForm.Input
            id="extra-info"
            placeholder="Building name, apt, floor number, street, etc ..."
            name="shippingAddressExtra"
            className="tw-bg-gray-100"
            defaultValue={shippingAddressExtra}
          />
        </div>
      )}
      <input
        type="hidden"
        name="shippingAddress"
        value={JSON.stringify(location)}
      />
    </div>
  );
};

export default DeliveryAddress;
