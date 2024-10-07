import React, { createContext, useContext, useEffect, useState } from 'react';
import { socketUrl } from './Base';
import { io } from "socket.io-client";
import { useMemo } from 'react';

// Create the context
export const SocketContext = createContext(null);


// The provider component
export const SocketProvider = ({ children }) => {
    // const [socket, setSocket] = useState(null);
    const [notification, setNotification] = useState(null);

    const socket = useMemo(
        () =>
          io(socketUrl, {
            withCredentials: true,
          }),
        []
      );
    
    useEffect(() => {
        socket.on("connect", () => {
          console.log("connected", socket.id);
        });
    
        // for all investor/single investor/admin notification
        socket.on("allInvestorNotification", (data) => {
          console.log("allInvestorNotification", data);
          setNotification(data);
        });
    
        return () => {
          socket.disconnect();
        };
      }, [socket]);// State to store the WebSocket instance

    return (
        <SocketContext.Provider value={notification}>
            {children}
        </SocketContext.Provider>
    );
};