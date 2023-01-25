import {
  ClientSocket,
  ClientToServerEvents,
} from "src/types/client-socket.type";

const useEventEmitter = <
  Event extends keyof ClientToServerEvents = keyof ClientToServerEvents
>(
  socket: ClientSocket | null,
  event: Event
) => {
  function trigger(...args: Parameters<ClientToServerEvents[Event]>) {
    if (!socket) return null;

    return socket.emit(event, ...args);
  }

  return { trigger };
};

export default useEventEmitter;
