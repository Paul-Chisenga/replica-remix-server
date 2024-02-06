import type { MenuItem, Prisma, Product } from "@prisma/client";
import type { FC } from "react";
import { parseMenuCategory } from "~/utils/helpers";
import FormError from "../common/FormError";
import MyForm from "../Form/MyForm";
import ProductChoices from "./ProductChoices";

interface Props {
  actionData?: any;
  product?: Product;
  menu: MenuItem[];
}

const CreateProductForm: FC<Props> = ({ actionData, product, menu }) => {
  return (
    <>
      <MyForm.Group className="mb-5">
        <MyForm.Input
          type="text"
          id="title"
          label="Title"
          required
          name="title"
          defaultValue={product?.title}
          // value={product?.title}
          errormessage={actionData?.errors?.title}
        />
        <MyForm.TextArea
          rows={3}
          id="descritpion"
          label="Description"
          name="description"
          defaultValue={product?.description ?? ""}
          // value={product?.description ?? ""}
          errormessage={actionData?.errors?.description}
        />
        <MyForm.Input
          type="number"
          id="price"
          label="Price"
          name="price"
          required
          defaultValue={product?.price}
          // value={product?.price}
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
        <MyForm.Input
          type={"checkbox"}
          id="veg"
          label="Vegeterian"
          name="vegeterian"
          defaultChecked={!!(product?.meta as Prisma.JsonObject)?.vegeterian}
          // checked={(product as any)?.vegeterian}
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
          name="image"
          placeholder="image"
          accept="image/*"
        />
      </MyForm.Group>
      <FormError>{actionData?.error}</FormError>
    </>
  );
};

export default CreateProductForm;
