import { Socket } from "socket.io-client";
import { TagType } from "./tag.type";
import { TodoType } from "./todo.type";

export interface ServerToClientEvents {
  todoCreated: (todo: TodoType) => void;
  todoUpdated: (todo: TodoType) => void;
  todoDeleted: (todoId: number) => void;
  tagCreated: (tag: TagType) => void;
  tagUpdated: (tag: TagType) => void;
  tagDeleted: (tagId: number) => void;
}

export interface ClientToServerEvents {
  connectToProject: (projectId: number) => void;
}

export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
