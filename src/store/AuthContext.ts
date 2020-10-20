import { createContext, Dispatch, SetStateAction } from "react";

interface AuthContextProps {
  authenticated: boolean,
  setAuthenticated: Dispatch<SetStateAction<boolean>>,
  user: any,
  setUser: Dispatch<SetStateAction<any>>,
}

export default createContext<AuthContextProps>({
  authenticated: false,
  setAuthenticated: () => {},
  user: null,
  setUser: () => {},
})