import { Role } from "@prisma/client";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useTypedLoaderData } from "remix-typedjson";
import Breadcrumb from "~/components/common/Breadcrumb";
import Card1 from "~/components/common/Card1";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "My Account - Replica restaurant" },
    {
      name: "description",
      content: "Find health food at replica!",
    },
  ];
};

const Profile = () => {
  const customer = useTypedLoaderData<typeof loader>();
  return (
    <div>
      <Breadcrumb pageName="Profile" pageTitle="Profile" />
      <div className="faq-area pt-120 pb-120">
        <div className="container">
          <div className="tw-max-w-screen-md">
            <div className="section-title">
              <span>
                <img
                  className="left-vec"
                  src="/images/icon/sub-title-vec.svg"
                  alt="sub-title-vec"
                />
                profile
                <img
                  className="right-vec"
                  src="/images/icon/sub-title-vec.svg"
                  alt="sub-title-vec"
                />
              </span>
              <h2>Account Information</h2>
            </div>

            <Card1 title="Account details">
              <div className="tw-px-4">
                <h6 className="mb-2">
                  <i className="bi bi-person tw-text-primary"></i>
                  <span className="tw-inline-block tw-text-dark tw-font-jost tw-ml-3 ">
                    {customer.profile.firstname} {customer.profile.lastname}
                  </span>
                </h6>
                <h6 className="mb-2">
                  <i className="bi bi-envelope tw-text-primary"></i>
                  <span className="tw-inline-block tw-text-dark tw-font-jost tw-ml-3 ">
                    {customer.profile.email}
                  </span>
                </h6>
                <h6 className="">
                  <i className="bi bi-telephone tw-text-primary"></i>
                  <span className="tw-inline-block tw-text-dark tw-font-jost tw-ml-3 ">
                    +254 {customer.profile.phone}
                  </span>
                </h6>
              </div>
            </Card1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
export async function loader({ request }: LoaderArgs) {
  const session = await requireUserSession(request, [Role.CUSTOMER]);
  const customer = await prisma.customer.findUniqueOrThrow({
    where: {
      profileId: session.profileId,
    },
    include: {
      profile: true,
    },
  });
  return customer;
}
