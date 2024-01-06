import type { Prisma, ProductChoice } from "@prisma/client";
import { Role } from "@prisma/client";
import {
  unstable_parseMultipartFormData,
  type ActionArgs,
  type LoaderArgs,
} from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import ProductChoices from "~/components/admin-product/ProductChoices";
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
  MyFormData,
} from "~/utils/helpers";
import type { MyActionData, MyObject, ProductPayload } from "~/utils/types";

const NewProduct = () => {
  const { menu, product } = useTypedLoaderData<typeof loader>();
  const actionData = useActionData() as MyActionData | null;

  const navigation = useNavigation();

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
            <input type="hidden" name="productId" defaultValue={product?.id} />
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
                errormessage={actionData?.errors?.title}
              />
              <MyForm.TextArea
                rows={3}
                id="descritpion"
                label="Description"
                name="description"
                defaultValue={product?.description ?? ""}
                errormessage={actionData?.errors?.description}
              />
              <MyForm.Input
                type="number"
                id="price"
                label="Price"
                name="price"
                required
                defaultValue={product?.price}
                errormessage={actionData?.errors?.price}
              />
              <MyForm.Select.Wrapper
                id="menu"
                label="Menu"
                name="menuId"
                required
                defaultValue={product?.menuItemId}
                errormessage={actionData?.errors?.menuId}
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
                    {item.title} - {parseMenuCategory(item.category)}
                  </MyForm.Select.Option>
                ))}
              </MyForm.Select.Wrapper>
              <MyForm.Input
                type={"checkbox"}
                id="veg"
                label="Vegeterian"
                name="vegeterian"
                defaultChecked={
                  !!(product?.meta as Prisma.JsonObject)?.vegeterian
                }
              />
              <MyForm.Misc className="tw-mb-6">
                <MyForm.Label>Choices</MyForm.Label>
                <ProductChoices
                  choices={product?.choices}
                  errors={actionData?.errors}
                />
              </MyForm.Misc>
              <MyForm.File
                id="image"
                name="images"
                placeholder="images"
                multiple
                accept="image/*"
              />
            </MyForm.Group>
          </div>
        </Modal.Body>
        <Modal.Footer className="tw-p-4">
          <Button2>
            {navigation.state == "submitting" ? "Saving..." : "Save Product"}
          </Button2>
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
        images: true,
        menuItem: true,
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
  const fData = await unstable_parseMultipartFormData(
    request,
    fileUploadeHandler
  );

  const formData = new MyFormData(fData);
  const productId = formData.get("productId");
  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const menuId = formData.get("menuId");
  const choicesNo = formData.get("choices");
  const vegeterian = formData.get("vegeterian");

  // Invariant validation
  invariantValidate({
    title,
    description,
    price,
    menuId,
    choicesNo,
  });
  let errors = requiredFieldValidate(
    {
      title,
      description,
      price,
      menuId,
      choicesNo,
    },
    ["title", "price", "menuId"]
  );

  // Computing choices
  const choices: ProductChoice[] = [];

  let i = 0;
  while (i < +choicesNo!) {
    const optionsFieldName = `options${i}`;
    const requiredFieldName = `required${i}`;
    const selectorFieldName = `selector${i}`;
    const requiredOptionsFieldName = `requiredOptions${i}`;
    const options = formData.getAll(optionsFieldName);
    const required = formData.get(requiredFieldName);
    const selector = formData.get(selectorFieldName);
    const requiredOptions = formData.get(requiredOptionsFieldName);

    invariantValidate({ selector, requiredOptions });

    const data: MyObject<string> = {};
    data[requiredFieldName] = required;
    data[selectorFieldName] = selector;
    data[requiredOptionsFieldName] = requiredOptions;
    console.log(i, data);
    const choiceFieldsErrors = requiredFieldValidate(
      data,
      [requiredFieldName, selectorFieldName, requiredOptionsFieldName],
      () => {
        const errorsD: MyObject<string | null> = {};

        errorsD[optionsFieldName] =
          options.length === 0
            ? "Please add at least one option."
            : options.some((opt) => !opt)
            ? "All option fields are required"
            : null;

        return errorsD;
      }
    );

    if (hasErrors(choiceFieldsErrors)) {
      errors = { ...errors, ...choiceFieldsErrors };
    } else {
      const choice: ProductChoice = {
        required: required === "on",
        selector: selector.trim(),
        requiredOptions: +requiredOptions,
        options: options.map((opt) => opt.trim()),
      };

      choices.push(choice);
    }
    ++i;
  }
  const images = fData.getAll("images") as File[];

  if (hasErrors(errors)) {
    return { errors };
  }

  const payload: ProductPayload = {
    title: title.trim(),
    description: description?.trim(),
    menuId,
    price: +price,
    choices,
    images,
    isVegeterian: !!vegeterian,
  };

  try {
    if (productId) {
      await updateProduct(session.profileId, productId, payload);
    } else {
      await createProduct(session.profileId, payload);
    }
    return { success: true };
  } catch (error: any) {
    console.log(error);
    if (error.status === 422) {
      return { error: error.message };
    }
    throw new Error("Something went wrong.");
  }
}
