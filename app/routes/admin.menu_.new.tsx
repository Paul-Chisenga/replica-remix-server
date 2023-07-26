import { MenuCategory } from "@prisma/client";
import { Form, useActionData } from "@remix-run/react";
import Button2 from "~/components/Button/Button2";
import MyForm from "~/components/Form/MyForm";

const AddMenu = () => {
  const actionData = useActionData();
  return (
    <>
      <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-screen-sm">
        <h4 className="mb-20 tw-text-3xl title">Add Menu</h4>
        {actionData?.error && (
          <div className="tw-px-2 tw-text-sm tw-text-red-500 tw-font-jost">
            {actionData?.error}
          </div>
        )}
        <br />
        <Form action="" method="POST">
          <MyForm.Group>
            <MyForm.Input
              type="text"
              placeholder="Title"
              label="Title"
              required
              name="title"
            />
            <MyForm.Misc>
              <MyForm.Label required>Category</MyForm.Label>
              <MyForm.Input
                type="radio"
                label="Beverage"
                value={MenuCategory.BEVARAGE}
                required
                name="category"
              />
              <MyForm.Input
                type="radio"
                label="Bakery"
                value={MenuCategory.BAKERY}
                required
                name="category"
              />
              <MyForm.Input
                type="radio"
                label="Breakfast"
                value={MenuCategory.BREAKFAST}
                required
                name="category"
              />
              <MyForm.Input
                type="radio"
                label="Lunch/Dinner"
                value={MenuCategory.FOOD}
                required
                name="category"
              />
            </MyForm.Misc>
          </MyForm.Group>
          <Button2>Add Menu</Button2>
        </Form>
      </div>
    </>
  );
};

export default AddMenu;
