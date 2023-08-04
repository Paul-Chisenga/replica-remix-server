import { Prisma } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useTypedFetcher } from "remix-typedjson";
import { CartContext } from "~/context/CartContext";
import type { action } from "~/routes/_main.shop_.$id.add-to-cart";

const cartItemWithProduct = Prisma.validator<Prisma.CartItemArgs>()({
  include: {
    product: true,
  },
});

type CartWithProduct = Prisma.CartItemGetPayload<typeof cartItemWithProduct>;

interface Props {
  item: CartWithProduct;
  image: string;
}

const CartItem: FC<Props> = ({ item, image }) => {
  const [count, setCount] = useState(item.count);

  const fetcher = useTypedFetcher<typeof action>();
  const cartContext = useContext(CartContext);

  const increment = () => {
    fetcher.submit(
      {},
      {
        action: `add-to-cart`,
        method: "POST",
      }
    );
  };

  const decrement = () => {
    if (count > 0) {
      fetcher.submit(
        {},
        {
          action: `remove-from-cart`,
          method: "POST",
        }
      );
    }
  };
  const handleDelete = () => {
    fetcher.submit(
      {},
      {
        action: `delete-cart-item`,
        method: "POST",
      }
    );
  };

  useEffect(() => {
    if (fetcher.data) {
      cartContext.updateCart(fetcher.data.totalUserCartItems);
      setCount(fetcher.data.totalProductCartItems);
      item.count = fetcher.data.totalProductCartItems;
    }
  }, [fetcher.data]);

  if (count <= 0) {
    return null;
  }

  return (
    <tr>
      <td data-label="Delete">
        <div className="delete-icon" onClick={handleDelete}>
          <i className="bi bi-x" />
        </div>
      </td>
      <td data-label="Image">
        <img src={"/images/bg/" + image} alt="" />
      </td>
      <td data-label="Food Name">
        <Link to={`/shop/${item.productId}`} className="tw-capitalize">
          {item.product.title}
        </Link>
      </td>
      <td data-label="Unite Price">
        <del>
          <span className="tw-text-xs">ksh</span>
          <span>{item.product.prices[0]}</span>
        </del>
      </td>
      <td data-label="Discount Price">
        <span className="tw-text-xs">ksh</span>
        <span>{item.product.prices[0]}</span>
      </td>
      <td data-label="Quantity">
        <div className="quantity d-flex align-items-center">
          <div className="quantity-nav nice-number d-flex align-items-center">
            <button onClick={decrement} type="button">
              <i className="bi bi-dash"></i>
            </button>
            <div>
              {fetcher.state === "submitting" ? (
                <ClipLoader size={15} />
              ) : (
                <span style={{ margin: "0 8px" }}>{count}</span>
              )}
            </div>
            <button onClick={increment} type="button">
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
      </td>
      <td data-label="Subtotal">
        <span className="tw-text-xs">ksh</span>
        <span>{item.product.prices[0] * count}</span>
      </td>
    </tr>
  );
};

export default CartItem;
