import { Role } from "@prisma/client";
import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import CreateRiderForm from "~/components/admin-product/CreateRiderForm";
import Modal from "~/components/Modal/Modal";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";
import {
  hasErrors,
  invariantValidate,
  requiredFieldValidate,
} from "~/utils/helpers";
import type { MyObject } from "~/utils/types";

export default function EditRider() {
  const rider = useTypedLoaderData<typeof loader>();
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const handleDismiss = () => {
    navigate(-1);
  };

  return (
    <Form action="" method="POST">
      <Modal.Wrapper
        show
        size="sm"
        onDismiss={handleDismiss}
        loading={navigation.state === "submitting"}
        blur
      >
        <Modal.Header onClose={handleDismiss}>
          Edit rider's information - {rider.profile.firstname}
        </Modal.Header>
        <Modal.Body>
          <CreateRiderForm actionData={actionData} rider={rider} />
        </Modal.Body>
      </Modal.Wrapper>
    </Form>
  );
}

export const loader = async ({ params, request }: LoaderArgs) => {
  await requireUserSession(request, [Role.ADMIN]);
  try {
    const user = await prisma.rider.findUniqueOrThrow({
      where: { id: params.id! },
      include: {
        profile: true,
      },
    });

    return user;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const action: ActionFunction = async ({ request, params }) => {
  if (request.method !== "POST") {
    throw new Error("Bad request");
  }
  const data = Object.fromEntries(await request.formData()) as MyObject<string>;

  // Invariant Validation
  invariantValidate(data);

  // Custom form errors
  const errors = requiredFieldValidate(data, [
    "firstname",
    "lastname",
    "email",
    "phone",
  ]);
  if (hasErrors(errors)) {
    return { errors, error: "Some fields are missing." };
  }

  if (`${+data.phone}`.length !== 9) {
    return {
      errors: {
        phone: "Invalid phone number",
      },
    };
  }

  try {
    await prisma.rider.update({
      where: { id: params.id! },
      data: {
        profile: {
          update: {
            firstname: data.firstname.trim(),
            lastname: data.lastname.trim(),
          },
        },
      },
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong.");
  }
};
