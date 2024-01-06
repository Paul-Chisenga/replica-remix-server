import { Role } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import FormError from "~/components/common/FormError";
import FormSuccess from "~/components/common/FormSuccess";
import MyForm from "~/components/Form/MyForm";
import Modal from "~/components/Modal/Modal";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";
import {
  hasErrors,
  invariantValidate,
  requiredFieldValidate,
} from "~/utils/helpers";
import type { MyObject } from "~/utils/types";

export default function AssignRider() {
  const riders = useTypedLoaderData<typeof loader>();
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
        <Modal.Header onClose={handleDismiss}>Assign rider</Modal.Header>
        <Modal.Body>
          <MyForm.Group>
            <MyForm.Select.Wrapper
              id="rider"
              name="riderId"
              label="Select a rider"
              required
              errormessage={actionData?.errors?.riderId}
            >
              <MyForm.Select.Option value={""}></MyForm.Select.Option>
              {riders.map((rider) => (
                <MyForm.Select.Option key={rider.id} value={rider.id}>
                  {rider.profile.firstname + " " + rider.profile.lastname}
                </MyForm.Select.Option>
              ))}
            </MyForm.Select.Wrapper>
          </MyForm.Group>
          <MyForm.Group>
            <FormError>{actionData?.error}</FormError>
            {actionData?.success && (
              <FormSuccess>
                Success, The rider has been assigned to the order
              </FormSuccess>
            )}
          </MyForm.Group>
        </Modal.Body>
      </Modal.Wrapper>
    </Form>
  );
}

export const loader = async ({ params, request }: LoaderArgs) => {
  try {
    const rider = await prisma.rider.findMany({
      include: {
        profile: true,
      },
    });

    return rider;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
};

export const action = async ({ request, params }: ActionArgs) => {
  if (request.method !== "POST") {
    throw new Error("Bad request");
  }
  await requireUserSession(request, [Role.ADMIN]);
  const data = Object.fromEntries(await request.formData()) as MyObject<string>;

  // Invariant Validation
  invariantValidate(data);

  // Custom form errors
  const errors = requiredFieldValidate(data, ["riderId"]);
  if (hasErrors(errors)) {
    return { errors };
  }

  try {
    await prisma.order.update({
      where: { id: params.id! },
      data: {
        rider: {
          connect: { id: data.riderId },
        },
      },
    });

    return { success: true };
  } catch (error: any) {
    throw new Error("Something went wrong.");
  }
};
