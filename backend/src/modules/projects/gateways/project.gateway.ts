import { TagEntity } from '@modules/tags/entities';
import { TodoEntity } from '@modules/Todos/entities';
import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtAuthWsGuard, ProjectWsGuard } from '@shared/guards';

import { ProjectClient, ProjectServer } from './sockets.types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'projects',
})
export class ProjectGateway {
  @WebSocketServer()
  server: ProjectServer;

  @SubscribeMessage('connectToProject')
  @UseGuards(JwtAuthWsGuard, ProjectWsGuard)
  async handleConnectToProject(
    @MessageBody() projectId: number,
    @ConnectedSocket() client: ProjectClient,
  ): Promise<any> {
    const leavePromises: (Promise<void> | void)[] = [];

    for (const room of client.rooms) {
      if (room.startsWith('project')) leavePromises.push(client.leave(room));
    }
    await Promise.allSettled(leavePromises);

    await client.join(`project ${projectId}`);
  }

  broadcastTodoCreation(projectId: number, todo: TodoEntity) {
    this.toProjectRoom(projectId).emit('todoCreated', todo);
  }

  broadcastTodoUpdate(
    projectId: number,
    todo: Partial<TodoEntity> & { id: number },
  ) {
    this.toProjectRoom(projectId).emit('todoUpdated', todo);
  }

  broadcastTagCreation(projectId: number, tag: TagEntity) {
    this.toProjectRoom(projectId).emit('tagCreated', tag);
  }

  broadcastTagUpdate(
    projectId: number,
    tag: Partial<TagEntity> & { id: number },
  ) {
    this.toProjectRoom(projectId).emit('tagUpdated', tag);
  }

  broadcastTagDeletion(data: { tagId: number; projectId: number }) {
    const { projectId, tagId } = data;

    this.toProjectRoom(projectId).emit('tagDeleted', tagId);
  }

  broadcastTodoDeletion(data: { todoId: number; projectId: number }) {
    const { projectId, todoId } = data;

    this.toProjectRoom(projectId).emit('todoDeleted', todoId);
  }

  private toProjectRoom(projectId: number) {
    return this.server.to(`project ${projectId}`);
  }
}
