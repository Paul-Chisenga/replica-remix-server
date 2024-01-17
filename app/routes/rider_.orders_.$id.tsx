import { OrderStatus, Role } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";
import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  useDirectionsService,
} from "@vis.gl/react-google-maps";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useTypedLoaderData } from "remix-typedjson";
import Card1 from "~/components/common/Card1";
import FormError from "~/components/common/FormError";
import MyForm from "~/components/Form/MyForm";
import DualRingLoader from "~/components/indicators/DualRingLoader";
import CustomerMarker from "~/components/map/CustomerMarker";
import LocationTracker from "~/components/map/LocationTracker";
import RiderMarker from "~/components/map/RiderMarker";
import Modal from "~/components/Modal/Modal";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";
import { MAP_ID, REPLICA_POSITION } from "~/utils/types";

// DIRECTION API
interface DirectionProps {
  origin: google.maps.LatLngLiteral | undefined;
  destination: google.maps.LatLngLiteral | undefined;
}

const Direction: FC<DirectionProps> = ({ origin, destination }) => {
  const { directionsService, directionsRenderer } = useDirectionsService({
    renderOnMap: true,
    renderOptions: {
      markerOptions: { opacity: 0.0 },
      polylineOptions: { strokeColor: "black" },
    },
  });

  useEffect(() => {
    if (directionsService && origin && destination) {
      directionsService
        .route({
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((res) => {
          directionsRenderer?.setDirections(res);
        })
        .catch(() => {
          alert("Error creating directions");
        });
    }
  }, [destination, directionsRenderer, directionsService, origin]);
  return <></>;
};

const StartTrip = () => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="start-trip" method="POST">
      <button
        type="submit"
        className="my-btn fill dark tw-block tw-w-full tw-rounded tw-py-4"
      >
        <i className="bi bi-truck"></i>
        Start trip
        {fetcher.state === "submitting" && <DualRingLoader size={15} />}
      </button>
    </fetcher.Form>
  );
};

const EndTrip = () => {
  const [end, setEnd] = useState(false);
  const fetcher = useFetcher();

  if (fetcher.data && fetcher.data.success) {
    return (
      <div className="container">
        <div className="card">
          <div className="tw-px-2 tw-text-sm tw-text-emerald-500 tw-font-jost">
            Success, delivery done.
            <Link to="/Orders" className="tw-text-inherit tw-underline">
              Orders
            </Link>
          </div>
          <br />
        </div>
      </div>
    );
  }

  return (
    <>
      {end && (
        <fetcher.Form action="end-trip" method="POST">
          <Modal.Wrapper
            show
            size="sm"
            blur
            onDismiss={() => setEnd(false)}
            loading={fetcher.state === "submitting"}
          >
            <Modal.Header onClose={() => setEnd(false)}>
              Enter verification code
            </Modal.Header>
            <Modal.Body>
              <MyForm.Group className="md:tw-w-1/2">
                <MyForm.Input
                  id="code"
                  name="code"
                  placeholder="verification code"
                  required
                />
              </MyForm.Group>
              <MyForm.Group>
                <FormError>{fetcher.data?.error}</FormError>
              </MyForm.Group>
            </Modal.Body>
          </Modal.Wrapper>
        </fetcher.Form>
      )}
      <button
        type="button"
        className="my-btn fill primary tw-block tw-w-full tw-rounded tw-py-4"
        onClick={() => setEnd(true)}
      >
        <i className="bi bi-check-circle"></i>
        End trip
      </button>
    </>
  );
};

export default function OrderShipping() {
  const { order, API_KEY } = useTypedLoaderData<typeof loader>();
  const [position, setPosition] = useState<google.maps.LatLngLiteral>();

  if (order.status === OrderStatus.recieved) {
    return <Card1 title="Preparing..." />;
  } else if (order.status === OrderStatus.delivered) {
    return (
      <Card1 title="Delivered.">
        <Link to={"/rider/orders"} className="my-btn fill primary">
          See orders
        </Link>
      </Card1>
    );
  }

  return (
    <div className="">
      <APIProvider apiKey={API_KEY}>
        {/* {showMap && ( */}
        <div className="tw-mb-8 tw-rounded-lg tw-overflow-hidden tw-h-screen tw-absolute tw-inset-0">
          <Map
            zoom={18}
            center={REPLICA_POSITION}
            disableDefaultUI={true}
            fullscreenControl
            mapId={MAP_ID}
          >
            <MapControl position={ControlPosition.TOP_CENTER}>
              <div className="mt-20 tw-w-screen tw-max-w-sm">
                {order.status === OrderStatus.preparing && <StartTrip />}
                {order.status === OrderStatus.shipping && <EndTrip />}
              </div>
            </MapControl>
            <Direction
              origin={position}
              destination={order.customer.shippingAddress!}
            />
            <CustomerMarker
              origin={position}
              destination={order.customer.shippingAddress!}
              draggable={false}
            />
            <RiderMarker position={position} />
            <LocationTracker
              watch={
                order.status === OrderStatus.preparing ||
                order.status === OrderStatus.shipping
              }
              onChange={(pos) => setPosition({ lat: pos.lat, lng: pos.lng })}
            />
            <AdvancedMarker position={position}>
              <div
                className="tw-rounded-full tw-bg-black/50 -tw-mb-2"
                style={{ height: 10, width: 10 }}
              />
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>
    </div>
  );
}

export const loader = async ({ params, request }: LoaderArgs) => {
  await requireUserSession(request, [Role.RIDER]);
  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id: params.id! },
      include: {
        customer: {
          include: {
            profile: true,
          },
        },
      },
    });
    return { order, API_KEY: process.env.GOOGLE_MAPS_API_KEY as string };
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
