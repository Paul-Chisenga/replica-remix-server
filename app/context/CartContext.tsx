import React from "react";

const initialState = {} as { cart: number; updateCart: (n: number) => void };

export const CartContext = React.createContext(initialState);

const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = React.useState(0);
  const handleUpdateCart = (n: number) => {
    setCart(n);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        updateCart: handleUpdateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
