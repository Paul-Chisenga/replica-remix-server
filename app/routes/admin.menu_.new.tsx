import { MenuCategory, Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import Button2 from "~/components/Button/Button2";
import FormError from "~/components/Form/FormError";
import MyForm from "~/components/Form/MyForm";
import { createMenu } from "~/controllers/admin.server";
import { requireUserSession } from "~/controllers/auth.server";
import {
  hasErrors,
  invariantValidate,
  requiredFieldValidate,
} from "~/utils/helpers";
import type { MyActionData, MyObject } from "~/utils/types";

const AddMenu = () => {
  const actionData = useActionData() as MyActionData | null;
  const navigation = useNavigation();

  return (
    <>
      <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-screen-sm">
        <h4 className="mb-20 tw-text-3xl title">Add Menu</h4>
        <FormError message={actionData?.error} />
        <br />
        <Form action="" method="POST">
          <MyForm.Group disabled={navigation.state === "submitting"}>
            <MyForm.Input type="text" label="Title" required name="title" />
            <MyForm.Input type="text" label="Subtitle" name="subtitle" />
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

export async function action({ request }: ActionArgs) {
  if (request.method !== "POST") {
    throw new Error("Bad Request");
  }

  const session = await requireUserSession(request, [Role.ADMIN]);
  const data = Object.fromEntries(await request.formData()) as MyObject<string>;
  // Invariant validation
  invariantValidate(data);
  // Required input validation
  const errors = requiredFieldValidate(data, ["title", "category"]);
  if (hasErrors(errors)) {
    return errors;
  }
  try {
    await createMenu(session.profileId, {
      title: data.title.trim().toLowerCase(),
      subtitle: data.subtitle.trim().toLowerCase(),
      category: data.category,
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
