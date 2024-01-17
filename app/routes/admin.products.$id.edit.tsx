import type { LoaderArgs } from "@remix-run/node";
import { useNavigate, useFetcher } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import CreateProductForm from "~/components/admin-product/CreateProductForm";
import Modal from "~/components/Modal/Modal";
import { getMenuList } from "~/controllers/admin.server";
import prisma from "~/services/prisma.server";

export default function EditProduct() {
  const { menu, product } = useTypedLoaderData<typeof loader>();
  const navigate = useNavigate();
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form
        action="/admin/products/create"
        method="PUT"
        encType="multipart/form-data"
      >
        <Modal.Wrapper
          show
          size="sm"
          blur
          onDismiss={() => navigate(-1)}
          loading={fetcher.state === "submitting"}
        >
          <Modal.Header onClose={() => navigate(-1)}>
            Edit product - {product.title}
          </Modal.Header>
          <Modal.Body>
            <input type="hidden" name="productId" value={product.id} />
            <CreateProductForm
              menu={menu}
              actionData={fetcher.data}
              product={product}
            />
          </Modal.Body>
        </Modal.Wrapper>
      </fetcher.Form>
    </>
  );
}

export async function loader({ params }: LoaderArgs) {
  try {
    const menuList = await getMenuList();
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id: params.id!,
      },
      include: {
        menuItem: true,
      },
    });
    return { menu: menuList, product };
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}
