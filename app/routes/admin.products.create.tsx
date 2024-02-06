import type { Product, ProductChoice } from "@prisma/client";
import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { useTypedLoaderData } from "remix-typedjson";
import CreateProductForm from "~/components/admin-product/CreateProductForm";
import Modal from "~/components/Modal/Modal";
import {
  createProduct,
  getMenuList,
  updateProduct,
} from "~/controllers/admin.server";
import { requireUserSession } from "~/controllers/auth.server";
import { fileUploadeHandler } from "~/services/file_upload.server";
import {
  invariantValidate,
  requiredFieldValidate,
  hasErrors,
  MyFormData,
} from "~/utils/helpers";
import type { MyActionData, MyObject, ProductPayload } from "~/utils/types";
import data from "~/data/mains.json";
import DynamicFieldWrapper from "~/components/Form/DynamicFieldWrapper";

const NewProduct = () => {
  const { menu } = useTypedLoaderData<typeof loader>();
  const actionData = useActionData() as MyActionData | null;
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [count, setCount] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  useEffect(() => {
    setSelectedProduct(data[count - 1] as any);
  }, [count]);

  return (
    <Form action="" method="POST" encType="multipart/form-data">
      <Modal.Wrapper
        show
        size="sm"
        blur
        onDismiss={() => navigate(-1)}
        loading={navigation.state === "submitting"}
      >
        <Modal.Header onClose={() => navigate(-1)}>
          Create product {data.length}
        </Modal.Header>
        <Modal.Body>
          <DynamicFieldWrapper
            count={count}
            onAdd={() => setCount(count + 1)}
            onRemove={() => setCount(count - 1)}
          />
          <CreateProductForm
            menu={menu}
            actionData={actionData}
            product={selectedProduct}
          />
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
  if (request.method !== "POST" && request.method !== "PUT") {
    throw new Error("Bad Request");
  }

  const session = await requireUserSession(request, [Role.ADMIN]);
  const fData = await unstable_parseMultipartFormData(
    request,
    fileUploadeHandler
  );

  const formData = new MyFormData(fData);
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
  const image = fData.get("image") as File;

  if (hasErrors(errors)) {
    return { errors };
  }

  const payload: ProductPayload = {
    title: title.trim(),
    description: description?.trim(),
    menuId,
    price: +price,
    choices,
    image,
    isVegeterian: !!vegeterian,
  };

  try {
    if (request.method === "PUT") {
      const productId = formData.get("productId");
      await updateProduct(session.profileId, productId, payload);
    } else {
      await createProduct(session.profileId, payload);
    }
    return { success: true };
  } catch (error: any) {
    if (error.status === 422) {
      return { error: error.message };
    }
    throw new Error("Something went wrong.");
  }
}
