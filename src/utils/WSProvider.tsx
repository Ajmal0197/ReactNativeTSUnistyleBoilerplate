import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../redux/API";

// Define the interface for the WebSocket service
interface WSService {
  initializeSocket: () => void;
  emit: (event: string, data?: Record<string, unknown>) => void;
  on: (event: string, cb: (data: any) => void) => void;
  off: (event: string) => void;
  removeListener: (listenerName: string) => void;
}

// Create a context for the WebSocket service
const WSContext = createContext<WSService | undefined>(undefined);

// WebSocket provider component
export const WSProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Ref to store the socket instance
  const socket = useRef<Socket>();

  // Effect to initialize the socket connection
  useEffect(() => {
    socket.current = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    // Cleanup function to disconnect the socket
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  // Function to emit events through the socket
  const emit = (event: string, data: Record<string, unknown> = {}) => {
    socket.current?.emit(event, data);
  };

  // Function to listen for events from the socket
  const on = (event: string, cb: (data: any) => void) => {
    socket.current?.on(event, cb);
  };

  // Function to stop listening for events from the socket
  const off = (event: string) => {
    socket.current?.off(event);
  };

  // Function to remove a specific listener from the socket
  const removeListener = (listenerName: string) => {
    socket?.current?.removeListener(listenerName);
  };

  // WebSocket service object
  const socketService: WSService = {
    initializeSocket: () => { },
    emit,
    on,
    off,
    removeListener,
  };

  // Provide the WebSocket service to children components
  return (
    <WSContext.Provider value={socketService}>{children}</WSContext.Provider>
  );
};

// Custom hook to use the WebSocket service
export const useWS = (): WSService => {
  const socketService = useContext(WSContext);
  if (!socketService) {
    throw new Error("useWS must be used within a WSProvider");
  }
  return socketService;
};