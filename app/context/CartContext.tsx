import { Prisma, Role } from "@prisma/client";
import React from "react";
import useAuthContext from "~/hooks/useAuthContext";

<<<<<<< HEAD
const productWithPics = Prisma.validator<Prisma.ProductArgs>()({
  include: {
    pictures: true,
  },
});

export type ProductWithPics = Prisma.ProductGetPayload<typeof productWithPics>;

export type ContextCartItem = {
  id?: string;
  count: number;
  product: ProductWithPics;
  price: number;
};

const initialState: {
  items: ContextCartItem[];
  increment: (product: ProductWithPics, price: number) => void;
  decrement: (product: ProductWithPics, price: number) => void;
  remove: (product: ProductWithPics, price: number) => void;
  setCart: (ctxCartItem: ContextCartItem[]) => void;
} = {
  items: [],
  setCart() {},
  increment() {},
  decrement() {},
  remove() {},
=======
const initialState = {} as {
  cart: number;
  updateCart: (n: number) => void;
  clearCart: () => void;
>>>>>>> e88ae82
};

export const CartContext = React.createContext(initialState);

const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = React.useState<ContextCartItem[]>([]);

  const authContext = useAuthContext();

  const authorised = () =>
    !authContext.session || authContext.session.role === Role.CUSTOMER;

  const predicate = (
    item: ContextCartItem,
    product: ProductWithPics,
    price: number
  ) => item.product.id === product.id && item.price === price;

  const filterPredicate = (
    item: ContextCartItem,
    product: ProductWithPics,
    price: number
  ) => item.product.id !== product.id && item.price !== price;

  const handleIncrement = (product: ProductWithPics, price: number) => {
    if (!authorised()) return;
    const clone = [...cart];
    const itemIdx = clone.findIndex((item) => predicate(item, product, price));
    if (itemIdx > -1) {
      clone[itemIdx].count += 1;
    } else {
      clone.push({ product, count: 1, price });
    }

    setCart(clone);
  };

  const handleDecrement = (product: ProductWithPics, price: number) => {
    if (!authorised()) return;
    let clone = [...cart];
    const itemIdx = clone.findIndex((item) => predicate(item, product, price));
    if (itemIdx > -1) {
      // remove from cart if only one product
      if (clone[itemIdx].count === 1) {
        clone = clone.filter((item) => filterPredicate(item, product, price));
      } else {
        clone[itemIdx].count -= 1;
      }
    }

    setCart(clone);
  };

  const handleRemoveItem = (product: ProductWithPics, price: number) => {
    if (!authorised()) return;
    let clone = [...cart];

    const item = clone.find((item) => predicate(item, product, price));
    if (item) {
      clone = clone.filter((item) => filterPredicate(item, product, price));
    }
    setCart(clone);
  };

  return (
    <CartContext.Provider
      value={{
<<<<<<< HEAD
        items: cart,
        increment: handleIncrement,
        decrement: handleDecrement,
        remove: handleRemoveItem,
        setCart,
=======
        cart,
        updateCart: handleUpdateCart,
        clearCart() {
          setCart(0);
        },
>>>>>>> e88ae82
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
