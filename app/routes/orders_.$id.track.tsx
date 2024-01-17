import { OrderStatus, Role } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
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
import CustomerMarker from "~/components/map/CustomerMarker";
import RiderMarker from "~/components/map/RiderMarker";
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

export default function OrderShipping() {
  const { order, API_KEY } = useTypedLoaderData<typeof loader>();
  const [position, setPosition] =
    useState<google.maps.LatLngLiteral>(REPLICA_POSITION);

  if (order.status === OrderStatus.recieved) {
    return (
      <div className="tw-mt-48 container">
        <Card1 title="Preaparing." />
      </div>
    );
  } else if (order.status === OrderStatus.delivered) {
    return (
      <div className="tw-mt-48 container">
        <Card1 title="Delivered.">
          <Link to={"/shop"} className="my-btn fill primary">
            Go shopping
          </Link>
        </Card1>
      </div>
    );
  }

  return (
    <div className="">
      <APIProvider apiKey={API_KEY}>
        <div className="tw-mb-8 tw-rounded-lg tw-overflow-hidden tw-h-screen tw-absolute tw-inset-0">
          <Map
            zoom={18}
            center={REPLICA_POSITION}
            disableDefaultUI={true}
            fullscreenControl
            mapId={MAP_ID}
          >
            <MapControl position={ControlPosition.BOTTOM_CENTER}>
              <div
                className="tw-w-screen tw-max-w-screen-sm tw-drop-shadow-md tw-border-gray-200"
                style={{ border: "1px solid" }}
              >
                <Card1 title="Rider details" className="tw-bg-white/95 rounded">
                  <div className="tw-p-4">
                    <h5 className="tw-capitalize tw-font-cormorant tw-text-2xl tw-font-black tw-leading-6 tw-text-dark tw-mb-4 ">
                      {order.rider?.profile.firstname +
                        " " +
                        order.rider?.profile.lastname}
                    </h5>
                    <span className="tw-inline-block tw-text-dark tw-font-jost tw-opacity-90 tw-font-normal tw-text-sm ">
                      +254 {order.rider?.profile.phone}
                    </span>
                  </div>
                </Card1>
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
  await requireUserSession(request, [Role.CUSTOMER]);
  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id: params.id! },
      include: {
        rider: {
          include: { profile: true },
        },
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
