import { useContext } from "react";
import { CartContext } from "~/context/CartContext";

const useCartContext = () => {
  const cartContext = useContext(CartContext);
  return cartContext;
};

export default useCartContext;
