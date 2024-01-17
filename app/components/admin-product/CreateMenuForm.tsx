import type { MenuItem } from "@prisma/client";
import { MenuCategory } from "@prisma/client";
import type { FC } from "react";
import FormError from "../common/FormError";
import MyForm from "../Form/MyForm";

interface Props {
  actionData?: any;
  menu?: MenuItem;
}

const CreateMenuForm: FC<Props> = ({ actionData, menu }) => {
  return (
    <>
      <MyForm.Group>
        <MyForm.Input
          type="text"
          label="Title"
          required
          name="title"
          defaultValue={menu?.title}
        />
        <MyForm.Misc>
          <MyForm.Label required>Category</MyForm.Label>
          <MyForm.Input
            id="bev"
            type="radio"
            label="Beverage"
            value={MenuCategory.BEVERAGE}
            required
            name="category"
            defaultChecked={menu?.category === MenuCategory.BEVERAGE}
          />
          <MyForm.Input
            id="bek"
            type="radio"
            label="Bakery"
            value={MenuCategory.BAKERY}
            required
            name="category"
            defaultChecked={menu?.category === MenuCategory.BAKERY}
          />
          <MyForm.Input
            id="br"
            type="radio"
            label="Breakfast"
            value={MenuCategory.BREAKFAST}
            required
            name="category"
            defaultChecked={menu?.category === MenuCategory.BREAKFAST}
          />
          <MyForm.Input
            id="fd"
            type="radio"
            label="Lunch/Dinner"
            value={MenuCategory.FOOD}
            required
            name="category"
            defaultChecked={menu?.category === MenuCategory.FOOD}
          />
        </MyForm.Misc>
      </MyForm.Group>
      <FormError className="mt-20">{actionData?.error}</FormError>
    </>
  );
};

export default CreateMenuForm;
