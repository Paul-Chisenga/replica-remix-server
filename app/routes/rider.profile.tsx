import { Role } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { useTypedLoaderData } from "remix-typedjson";
import Card1 from "~/components/common/Card1";
import DashboardPageHeader from "~/components/common/DashboardPageHeader";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export default function Profile() {
  const rider = useTypedLoaderData<typeof loader>();

  return (
    <div>
      <DashboardPageHeader>Profile</DashboardPageHeader>
      <div>
        <Card1 title="Account details">
          <div className="tw-px-4">
            <h6 className="mb-2">
              <i className="bi bi-person tw-text-primary"></i>
              <span className="tw-inline-block tw-text-dark tw-font-jost tw-ml-3 ">
                {rider.profile.firstname} {rider.profile.lastname}
              </span>
            </h6>
            <h6 className="mb-2">
              <i className="bi bi-envelope tw-text-primary"></i>
              <span className="tw-inline-block tw-text-dark tw-font-jost tw-ml-3 ">
                {rider.profile.email}
              </span>
            </h6>
            <h6 className="">
              <i className="bi bi-telephone tw-text-primary"></i>
              <span className="tw-inline-block tw-text-dark tw-font-jost tw-ml-3 ">
                +254 {rider.profile.phone}
              </span>
            </h6>
          </div>
        </Card1>
      </div>
    </div>
  );
}

export const loader = async ({ request }: LoaderArgs) => {
  const session = await requireUserSession(request, [Role.RIDER]);
  try {
    const user = await prisma.rider.findUniqueOrThrow({
      where: { profileId: session.profileId },
      include: { profile: true },
    });

    return user;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
};
