import { useEffect } from "react";
import {
  ClientSocket,
  ServerToClientEvents,
} from "../types/client-socket.type";

const useEventListener = <
  Event extends keyof ServerToClientEvents = keyof ServerToClientEvents
>(
  socket: ClientSocket | null,
  event: Event,
  listener: ServerToClientEvents[Event]
) => {
  return useEffect(() => {
    if (!socket) return;

    socket.on(event, listener as any);

    return () => {
      socket.off(event);
    };
  }, [event, listener, socket]);
};

export default useEventListener;
