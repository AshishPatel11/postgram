import { useContext, createContext } from "react";

//user context created
export const userContext = createContext(null)

//custom hook for accessing context
export const useUser = () => useContext(userContext)
