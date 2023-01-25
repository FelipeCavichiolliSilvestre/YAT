import { useAuth } from "@contexts/AuthContext";
import { useEffect, useState } from "react";
import { io, ManagerOptions, SocketOptions } from "socket.io-client";
import { ClientSocket } from "../types";

const useSocket = (
  namespace?: string,
  options?: Partial<SocketOptions & ManagerOptions>
) => {
  const { isAuthenticated, token } = useAuth();
  const [socket, setSocket] = useState<ClientSocket | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const base = "ws://192.168.0.158:3000";
    const uri = namespace ? base + "/" + namespace : base;

    const socket = io(uri, {
      auth: {
        token,
      },
      ...options,
    });

    setSocket(socket);

    return () => {
      if (socket) socket.disconnect();
    };
  }, [isAuthenticated, token]);

  return { socket, connected: !!socket && socket.connected };
};

export default useSocket;
