import { JwtPayload } from '@modules/auth/types';
import { TagEntity } from '@modules/tags/entities';
import { TodoEntity } from '@modules/Todos/entities';
import { Socket, Server } from 'socket.io';

interface ServerToClientEvents {
  connectToProject: (projectId: number) => void;
}

interface ClientToServerEvents {
  todoUpdated: (todo: Partial<TodoEntity> & { id: number }) => void;
  todoCreated: (todo: TodoEntity) => void;
  todoDeleted: (todoId: number) => void;
  tagCreated: (tag: TagEntity) => void;
  tagUpdated: (tag: Partial<TagEntity> & { id: number }) => void;
  tagDeleted: (tagId: number) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  jwt?: JwtPayload;
  projectId?: number;
}

type ProjectServer = Server<
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData
>;

type ProjectClient = Socket<
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData
>;

export { ProjectServer, ProjectClient };
