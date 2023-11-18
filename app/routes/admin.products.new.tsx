import type { SubMenu } from "@prisma/client";
import { Role } from "@prisma/client";
import {
  unstable_parseMultipartFormData,
  type ActionArgs,
  type LoaderArgs,
} from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { redirect, useTypedLoaderData } from "remix-typedjson";
import Button2 from "~/components/Button/Button2";
import FormError from "~/components/Form/FormError";
import MyForm from "~/components/Form/MyForm";
import Modal from "~/components/Modal/Modal";
import {
  createProduct,
  getMenuList,
  updateProduct,
} from "~/controllers/admin.server";
import { requireUserSession } from "~/controllers/auth.server";
import { fileUploadeHandler } from "~/services/file_upload.server";
import prisma from "~/services/prisma.server";
import {
  invariantValidate,
  requiredFieldValidate,
  hasErrors,
  parseMenuCategory,
} from "~/utils/helpers";
import type { MyActionData, MyObject } from "~/utils/types";

const NewProduct = () => {
  const { menu, product } = useTypedLoaderData<typeof loader>();
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

  useEffect(() => {
    if (product) {
      handleChangeMenu(product.subMenu.menuId);
      setSelectedSubmenu(product.subMenuId);
    }
  }, []);

  return (
    <Form action="" method="POST" encType="multipart/form-data">
      <Modal.Wrapper show size="sm">
        <Modal.Header>
          <Link
            to={".."}
            className="tw-block tw-text-right tw-pt-2 tw-px-4 tw-text-black"
          >
            X
          </Link>
        </Modal.Header>
        <Modal.Body>
          <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-screen-sm">
            <h4 className="mb-20 tw-text-3xl title">Add Product</h4>
            <FormError message={actionData?.error} />
            <br />
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
                defaultValue={product?.title}
              />
              <MyForm.Input
                type="text"
                id="subtitle"
                label="Subtitle"
                name="subtitle"
                defaultValue={product?.subtitle ?? ""}
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
                defaultValue={product?.description ?? ""}
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
                  defaultValue={product?.subMenu.menuId}
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
              <MyForm.File
                id="image"
                name="images"
                placeholder="images"
                multiple
              />
            </MyForm.Group>
            <input type="hidden" name="productId" defaultValue={product?.id} />
          </div>
        </Modal.Body>
        <Modal.Footer className="tw-p-4">
          <Button2>Save Product</Button2>
        </Modal.Footer>
      </Modal.Wrapper>
    </Form>
  );
};

export default NewProduct;
export async function loader({ request, params }: LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const productId = searchParams.get("pId");

  const menuList = await getMenuList();

  if (productId) {
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id: productId,
      },
      include: {
        pictures: true,
        subMenu: {
          include: {
            menu: true,
          },
        },
      },
    });

    return { menu: menuList, product };
  }

  return { menu: menuList };
}
export async function action({ request }: ActionArgs) {
  if (request.method !== "POST") {
    throw new Error("Bad Request");
  }

  const session = await requireUserSession(request, [Role.ADMIN]);
  const formData = await unstable_parseMultipartFormData(
    request,
    fileUploadeHandler
  );
  const data = Object.fromEntries(formData) as MyObject<string>;
  const images = formData.getAll("images") as File[];
  console.log(images);

  return null;
  // Invariant validation
  invariantValidate(data, ["images"]);
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
    if (data.productId) {
      await updateProduct(data.productId, {
        title: data.title.trim().toLowerCase(),
        subtitle: data.subtitle.trim().toLowerCase(),
        description: data.description.trim().toLowerCase(),
        prices: [+data.price],
        menu: data.menu,
        submenu: data.submenu,
        submenuTitle: data.submenuTitle
          ? data.submenuTitle.trim().toLowerCase()
          : undefined,
        images,
      });
    } else {
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
        images,
      });
    }

    return redirect("..");
  } catch (error: any) {
    console.log(error);
    if (error.status === 422) {
      return { error: error.message };
    }
    throw new Error("Something went wrong.");
  }
}
