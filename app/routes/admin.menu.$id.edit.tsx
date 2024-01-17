import type { LoaderArgs } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import CreateMenuForm from "~/components/admin-product/CreateMenuForm";
import Modal from "~/components/Modal/Modal";
import prisma from "~/services/prisma.server";

export default function EditMenu() {
  const menu = useTypedLoaderData<typeof loader>();
  const navigate = useNavigate();
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="/admin/menu/create" method="PUT">
      <Modal.Wrapper
        show
        size="sm"
        blur
        onDismiss={() => navigate(-1)}
        loading={fetcher.state === "submitting"}
      >
        <Modal.Header onClose={() => navigate(-1)}>
          Edit menu - {menu.title}
        </Modal.Header>
        <Modal.Body>
          <input type="hidden" name="menuId" value={menu.id} />
          <CreateMenuForm actionData={fetcher.data} menu={menu} />
        </Modal.Body>
      </Modal.Wrapper>
    </fetcher.Form>
  );
}

export const loader = async ({ params, request }: LoaderArgs) => {
  try {
    const menu = await prisma.menuItem.findUniqueOrThrow({
      where: { id: params.id! },
    });

    return menu;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
};
