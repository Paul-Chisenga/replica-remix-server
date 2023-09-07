import type { FC, ReactNode } from "react";
import { createContext, useState } from "react";
import type { AuthSession } from "~/utils/types";

const initialState: {
  session?: AuthSession;
  saveSession: (s: AuthSession) => void;
  removeSession: () => void;
} = {
  saveSession(s) {},
  removeSession() {},
};

export const AuthContext = createContext(initialState);

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession>();
  return (
    <AuthContext.Provider
      value={{
        session,
        saveSession: setSession,
        removeSession() {
          setSession(undefined);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
