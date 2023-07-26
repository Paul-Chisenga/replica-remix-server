import { Role } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import Button2 from "~/components/Button/Button2";
import FormError from "~/components/Form/FormError";
import MyForm from "~/components/Form/MyForm";
import { createProduct, getMenuList } from "~/controllers/admin.server";
import { requireUserSession } from "~/controllers/auth.server";
import {
  invariantValidate,
  requiredFieldValidate,
  hasErrors,
  parseMenuCategory,
} from "~/utils/helpers";
import type { MyActionData, MyObject } from "~/utils/types";

const NewProduct = () => {
  const menu = useTypedLoaderData<typeof loader>();
  const actionData = useActionData() as MyActionData | null;
  const navigation = useNavigation();

  return (
    <>
      <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-screen-sm">
        <h4 className="mb-20 tw-text-3xl title">Add Product</h4>
        <FormError message={actionData?.error} />
        <br />
        <Form action="" method="POST">
          <MyForm.Group disabled={navigation.state === "submitting"}>
            <MyForm.Input
              type="text"
              id="title"
              label="Title"
              required
              name="title"
            />
            <MyForm.Input
              type="text"
              id="subtitle"
              label="Subtitle"
              name="subtitle"
            />
            <MyForm.Input type="number" id="price" label="Price" name="price" />
            <MyForm.TextArea
              rows={3}
              id="descritpion"
              label="Description"
              name="description"
            />
            <MyForm.Select.Wrapper id="menu" label="Menu" name="menu" required>
              <MyForm.Select.Option value="">
                Choose a menu
              </MyForm.Select.Option>
              {menu.map((item) => (
                <MyForm.Select.Option
                  key={item.id}
                  value={item.id}
                  className="tw-capitalize"
                >
                  {item.title}
                  {item.subtitle && `(${item.subtitle})`} -{" "}
                  {parseMenuCategory(item.category)}
                </MyForm.Select.Option>
              ))}
            </MyForm.Select.Wrapper>
          </MyForm.Group>
          <Button2>Add Product</Button2>
        </Form>
      </div>
    </>
  );
};

export default NewProduct;
export async function loader({ request }: LoaderArgs) {
  const menuList = getMenuList();
  return menuList;
}
export async function action({ request }: ActionArgs) {
  if (request.method !== "POST") {
    throw new Error("Bad Request");
  }

  const session = await requireUserSession(request, [Role.ADMIN]);
  const data = Object.fromEntries(await request.formData()) as MyObject<string>;
  // Invariant validation
  invariantValidate(data);
  // Required input validation
  const errors = requiredFieldValidate(data, ["title", "menu"]);
  if (hasErrors(errors)) {
    return errors;
  }
  try {
    await createProduct(session.profileId, {
      title: data.title.toLowerCase(),
      subtitle: data.subtitle.toLowerCase(),
      description: data.description.toLowerCase(),
      price: data.price ? +data.price : undefined,
      menuId: data.menu,
      variations: [],
    });
    // return redirect("/admin/menu");
    return null;
  } catch (error: any) {
    if (error.status === 422) {
      return { error: error.message };
    }
    throw new Error("Something went wrong.");
  }
}
