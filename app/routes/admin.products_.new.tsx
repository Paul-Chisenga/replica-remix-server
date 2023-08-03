import type { SubMenu } from "@prisma/client";
import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";
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

  const [submenu, setSubmenu] = useState<SubMenu[]>([]);
  const [selectedSubmenu, setSelectedSubmenu] = useState("none");

  const navigation = useNavigation();

  const handleChangeMenu = (menuId: string) => {
    setSelectedSubmenu("none");
    const selectedMenu = menu.find((item) => item.id === menuId);
    if (!selectedMenu) {
      setSubmenu([]);
      return;
    }
    setSubmenu(selectedMenu.submenu.filter((item) => !!item.title));
  };

  return (
    <>
      <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-screen-sm">
        <h4 className="mb-20 tw-text-3xl title">Add Product</h4>
        <FormError message={actionData?.error} />
        <br />
        <Form action="" method="POST">
          <MyForm.Group
            disabled={navigation.state === "submitting"}
            className="mb-5"
          >
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
            <MyForm.Input
              type="number"
              id="price"
              label="Price"
              name="price"
              required
              defaultValue={250}
            />
            <MyForm.TextArea
              rows={3}
              id="descritpion"
              label="Description"
              name="description"
            />
            <MyForm.Misc className="tw-grid tw-grid-cols-2 tw-gap-4">
              <MyForm.Select.Wrapper
                id="menu"
                label="Menu"
                name="menu"
                required
                onChange={(e) => {
                  handleChangeMenu(e.target.value);
                }}
              >
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
              <div className="tw-space-y-4">
                <MyForm.Select.Wrapper
                  id="sub-menu-selector"
                  label="Sub menu"
                  name="submenu"
                  required
                  value={selectedSubmenu}
                  onChange={(e) => {
                    setSelectedSubmenu(e.target.value);
                  }}
                >
                  <MyForm.Select.Option value="none">
                    No Submenu
                  </MyForm.Select.Option>
                  {submenu.map((item) => (
                    <MyForm.Select.Option
                      key={item.id}
                      value={item.id}
                      className="tw-capitalize"
                    >
                      {item.title}
                    </MyForm.Select.Option>
                  ))}
                  <MyForm.Select.Option value="other">
                    Other
                  </MyForm.Select.Option>
                </MyForm.Select.Wrapper>
                {selectedSubmenu === "other" && (
                  <MyForm.Input
                    id="sub-Menu"
                    label="Enter a submenu title here"
                    name="submenuTitle"
                    required
                  />
                )}
              </div>
            </MyForm.Misc>
          </MyForm.Group>
          <Button2>Add Product</Button2>
        </Form>
      </div>
    </>
  );
};

export default NewProduct;
export async function loader() {
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
  const errors = requiredFieldValidate(data, [
    "title",
    "menu",
    "price",
    "submenu",
  ]);
  if (hasErrors(errors)) {
    console.log(errors);
    return errors;
  }

  try {
    await createProduct(session.profileId, {
      title: data.title.trim().toLowerCase(),
      subtitle: data.subtitle.trim().toLowerCase(),
      description: data.description.trim().toLowerCase(),
      prices: [+data.price],
      menu: data.menu,
      submenu: data.submenu,
      submenuTitle: data.submenuTitle
        ? data.submenuTitle.trim().toLowerCase()
        : undefined,
    });
    // return redirect("/admin/menu");
    return null;
  } catch (error: any) {
    console.log(error);
    if (error.status === 422) {
      return { error: error.message };
    }
    throw new Error("Something went wrong.");
  }
}
