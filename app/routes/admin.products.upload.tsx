import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import FormError from "~/components/common/FormError";
import MyForm from "~/components/Form/MyForm";
import Modal from "~/components/Modal/Modal";
import { getMenuList, uploadMenuImage } from "~/controllers/admin.server";
import { requireUserSession } from "~/controllers/auth.server";
import { fileUploadeHandler } from "~/services/file_upload.server";
import {
  invariantValidate,
  requiredFieldValidate,
  hasErrors,
  MyFormData,
  parseMenuCategory,
} from "~/utils/helpers";
import type { MyActionData } from "~/utils/types";

const NewProduct = () => {
  const { menu } = useTypedLoaderData<typeof loader>();
  const actionData = useActionData() as MyActionData | null;
  const navigation = useNavigation();
  const navigate = useNavigate();

  return (
    <Form action="" method="PATCH" encType="multipart/form-data">
      <Modal.Wrapper
        show
        size="sm"
        blur
        onDismiss={() => navigate(-1)}
        loading={navigation.state === "submitting"}
      >
        <Modal.Header onClose={() => navigate(-1)}>Upload picture</Modal.Header>
        <Modal.Body>
          <MyForm.Group>
            <MyForm.Select.Wrapper
              id="menu"
              label="Menu"
              name="menuId"
              required
              errormessage={actionData?.errors?.menuId}
            >
              <MyForm.Select.Option value="">Select</MyForm.Select.Option>
              {menu.map((item) => (
                <MyForm.Select.Option
                  key={item.id}
                  value={item.id}
                  className="tw-capitalize"
                >
                  {item.title} - {parseMenuCategory(item.category)}
                </MyForm.Select.Option>
              ))}
            </MyForm.Select.Wrapper>
            <MyForm.File
              id="image"
              name="image"
              placeholder="image"
              accept="image/*"
              required
              errormessage={actionData?.errors?.image}
            />
          </MyForm.Group>
          <FormError>{actionData?.error}</FormError>
        </Modal.Body>
      </Modal.Wrapper>
    </Form>
  );
};

export default NewProduct;
export async function loader() {
  const menuList = await getMenuList();

  return { menu: menuList };
}

export async function action({ request }: ActionArgs) {
  if (request.method !== "PATCH") {
    throw new Error("Bad Request");
  }

  const session = await requireUserSession(request, [Role.ADMIN]);
  const fData = await unstable_parseMultipartFormData(
    request,
    fileUploadeHandler
  );

  const formData = new MyFormData(fData);
  const menuId = formData.get("menuId");
  const image = fData.get("image") as File;

  // Invariant validation
  invariantValidate({ menuId });
  let errors = requiredFieldValidate({ menuId }, ["menuId"], () => {
    return { image: image.size > 0 ? null : "Image is required." };
  });

  if (hasErrors(errors)) {
    return { errors };
  }

  const payload = { menuId, image };

  try {
    await uploadMenuImage(session.profileId, payload);
    return { success: true };
  } catch (error: any) {
    if (error.status === 422) {
      return { error: error.message };
    }
    throw new Error("Something went wrong.");
  }
}
