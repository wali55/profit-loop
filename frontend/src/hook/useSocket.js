import { useContext } from "react";
import { SocketContext } from "../Provider";


// Custom hook for easier use of the context
export const useSocket = () => {
    return useContext(SocketContext);
};