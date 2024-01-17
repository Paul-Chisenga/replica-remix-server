import type { ActionFunction } from "@remix-run/node";
import { Form, useNavigate, useNavigation } from "@remix-run/react";
import { useTypedActionData } from "remix-typedjson";
import FormError from "~/components/common/FormError";
import MyForm from "~/components/Form/MyForm";
import Modal from "~/components/Modal/Modal";
import { login } from "~/controllers/auth.server";
import { hashPassword } from "~/services/bcrypt.server";
import { verifyToken } from "~/services/jwt";
import prisma from "~/services/prisma.server";
import type { RegistrationPayload } from "~/utils/types";

export default function VerifyNumber() {
  const actionData = useTypedActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  return (
    <>
      <Form action="" method="POST">
        <Modal.Wrapper
          size="sm"
          show
          blur
          loading={navigation.state === "submitting"}
          onDismiss={() => navigate("/login")}
        >
          <Modal.Header onClose={() => navigate("/login")}>
            Enter verification code
          </Modal.Header>
          <Modal.Body>
            <MyForm.Group>
              <MyForm.Misc>
                <p className="">
                  Please enter the one time code sent to your phone number
                </p>
              </MyForm.Misc>
              <MyForm.Input id="code" placeholder="Code" name="code" />
            </MyForm.Group>
            <MyForm.Group>
              <MyForm.Misc>
                <FormError>{actionData?.error}</FormError>
              </MyForm.Misc>
            </MyForm.Group>
          </Modal.Body>
        </Modal.Wrapper>
      </Form>
    </>
  );
}

export const action: ActionFunction = async ({ request, params }) => {
  if (request.method !== "POST") {
    throw new Error("Bad request");
  }
  const formData = await request.formData();
  const code = formData.get("code") as string;
  const token = params.token as string;
  const registrationPayload = verifyToken(
    token,
    process.env.ACCOUNT_NEW!
  ) as RegistrationPayload;

  if (!code) {
    return { error: "Verification code is required" };
  }

  if (code !== registrationPayload.code) {
    return { error: "The verification code is invalid." };
  }

  try {
    const user = await prisma.customer.create({
      data: {
        profile: {
          create: {
            firstname: registrationPayload.firstname,
            lastname: registrationPayload.lastname,
            email: registrationPayload.email,
            picture: registrationPayload.picture,
            phone: registrationPayload.phone,
            password: await hashPassword(registrationPayload.password),
            role: registrationPayload.role,
            active: true,
            meta: registrationPayload.provider
              ? {
                  provider: registrationPayload.provider,
                }
              : undefined,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return await login(
      {
        email: user.profile.email,
        password: user.profile.password,
        provider: true,
      },
      "/"
    );
  } catch (error) {
    console.log(error);
    throw new Error("Someting went wrong.");
  }
};
