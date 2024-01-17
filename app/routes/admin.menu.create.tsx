import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import CreateMenuForm from "~/components/admin-product/CreateMenuForm";
import Modal from "~/components/Modal/Modal";
import { createMenu, updateMenu } from "~/controllers/admin.server";
import { requireUserSession } from "~/controllers/auth.server";
import {
  hasErrors,
  invariantValidate,
  requiredFieldValidate,
} from "~/utils/helpers";
import type { MyActionData, MyObject } from "~/utils/types";
// import data from "~/data/menubeverage.json";
// import DynamicFieldWrapper from "~/components/Form/DynamicFieldWrapper";

const AddMenu = () => {
  const actionData = useActionData() as MyActionData | null;
  const navigate = useNavigate();
  const navigation = useNavigation();
  // const [count, setCount] = useState(1);
  // const [selectedMenu, setSelectedMenu] = useState<MenuItem>();

  // useEffect(() => {
  //   setSelectedMenu(data[count - 1] as any);
  // }, [count]);

  return (
    <Form action="" method="POST">
      <Modal.Wrapper
        show
        size="sm"
        blur
        onDismiss={() => navigate(-1)}
        loading={navigation.state === "submitting"}
      >
        <Modal.Header onClose={() => navigate(-1)}>Create menu</Modal.Header>
        <Modal.Body>
          {/* <DynamicFieldWrapper
            count={count}
            onAdd={() => setCount(count + 1)}
            onRemove={() => setCount(count + 1)}
          /> */}
          <CreateMenuForm actionData={actionData} />
        </Modal.Body>
      </Modal.Wrapper>
    </Form>
  );
};

export default AddMenu;

export async function action({ request }: ActionArgs) {
  if (request.method !== "POST" && request.method !== "PUT") {
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
    if (request.method === "POST") {
      await createMenu(session.profileId, {
        title: data.title.trim(),
        category: data.category.trim(),
      });
    } else {
      const menuId = data.menuId;
      await updateMenu(session.profileId, menuId, {
        title: data.title.trim(),
        category: data.category.trim(),
      });
    }

    return { success: true };
  } catch (error: any) {
    if (error.status === 422) {
      return { error: error.message };
    }
    throw new Error("Something went wrong.");
  }
}
