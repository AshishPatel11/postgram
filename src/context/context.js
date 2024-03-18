import { useContext, createContext } from "react";

export const userContext = createContext(null)

export const useUser = () => useContext(userContext)
