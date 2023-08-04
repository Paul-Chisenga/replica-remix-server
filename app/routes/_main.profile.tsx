import { Role } from "@prisma/client";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import Breadcrumb from "~/components/common/Breadcrumb";
import { requireUserSession } from "~/controllers/auth.server";

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
  return (
    <div>
      <Breadcrumb pageName="Profile" pageTitle="Profile" />
      <div className="tw-min-h-[55vh]"></div>
    </div>
  );
};

export default Profile;
export async function loader({ request }: LoaderArgs) {
  await requireUserSession(request, [Role.CUSTOMER]);
  return null;
}
