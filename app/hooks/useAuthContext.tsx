import { useContext } from "react";
import { AuthContext } from "~/context/AuthContext";

const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export default useAuthContext;
