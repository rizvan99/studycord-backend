import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import {
  ICategoryService,
  ICategoryServiceProvider,
} from '../../core/interface/category.service.interface';
import { Socket } from 'socket.io';
import {
  IReplyService,
  IReplyServiceProvider,
} from '../../core/interface/reply.service.interface';
import { CreateQuestionDto } from '../dto/create.question.dto';
import { CreateReplyDto } from '../dto/create.reply.dto';

@WebSocketGateway()
export class ReplyGateway {
  constructor(
    @Inject(IReplyServiceProvider) private replyService: IReplyService,
  ) {}

  @WebSocketServer() server;

  @SubscribeMessage('getAllReplies')
  async handleGetAllReplies(@ConnectedSocket() client: Socket): Promise<void> {
    const allReplies = await this.replyService.getReplies();
    client.emit('replies', allReplies);
  }

  @SubscribeMessage('createReply')
  async handleCreateReply(
    @MessageBody() data,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const reply: CreateReplyDto = {
        content: data.payload.content,
      };

      // Make createdBy into UserDTO to strip password
      const newReply = await this.replyService.createReply(
        reply,
        data.payload.createdBy,
        data.payload.question,
      );
      console.log(newReply);
      this.server.emit('newReply', newReply);
    } catch (e) {
      client.emit('reply-create-error', e.message);
    }
  }
}
