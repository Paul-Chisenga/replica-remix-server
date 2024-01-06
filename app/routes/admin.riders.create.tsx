import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import CreateRiderForm from "~/components/admin-product/CreateRiderForm";
import Modal from "~/components/Modal/Modal";
import { requireUserSession } from "~/controllers/auth.server";
import { sendEmail } from "~/services/email.server";
import { generateToken } from "~/services/jwt";
import prisma from "~/services/prisma.server";
import {
  hasErrors,
  invariantValidate,
  requiredFieldValidate,
} from "~/utils/helpers";
import type { MyObject } from "~/utils/types";

export default function CreateRider() {
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
        <Modal.Header onClose={handleDismiss}>Create new rider</Modal.Header>
        <Modal.Body>
          <CreateRiderForm actionData={actionData} />
        </Modal.Body>
      </Modal.Wrapper>
    </Form>
  );
}

export const action = async ({ request }: ActionArgs) => {
  if (request.method !== "POST") {
    throw new Error("Bad request");
  }
  await requireUserSession(request, [Role.ADMIN]);
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
    return { errors };
  }

  if (`${+data.phone}`.length !== 9) {
    return {
      errors: {
        phone: "Invalid phone number",
      },
    };
  }

  try {
    const user = await prisma.profile.findUnique({
      where: { email: data.email },
    });

    if (user) {
      return {
        error:
          "A User with this email exists already, choose another email address",
      };
    }

    // send verification email
    const token = generateToken(
      {
        firstname: data.firstname.trim(),
        lastname: data.lastname.trim(),
        email: data.email.trim(),
        phone: +data.phone,
        verificationCode: "1254",
      },
      process.env.ACCOUNT_NEW as string
    );

    await sendEmail({
      to: {
        name: data.firstname,
        email: data.email,
      },
      subject: "WELECOME TO REPLICA",
      message: `
      Hey ${data.firstname},

      Your account has been added on replica to be a ride on replica,
      <br />
      Make sure to provide the verification code sent to your phone number in order to verify your phone number
      <br />
      Click <a href="${process.env.HOST_URL}/rider/${token}" target="_blank" rel="noopener noreferrer">here</a> to proceed with verification.
    `,
    });

    return { success: true };
  } catch (error: any) {
    throw new Error("Something went wrong.");
  }
};
