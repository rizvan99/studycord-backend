import {
  ConnectedSocket, MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import {
  ICategoryService,
  ICategoryServiceProvider,
} from '../../core/interface/category.service.interface';
import { IQuestionService, IQuestionServiceInterface } from '../../core/interface/question.service.interface';
import { Question } from '../../core/model/question.model';
import { CreateQuestionDto } from '../dto/create.question.dto';
import { UserDto } from '../../../auth/dto/user.dto';

@WebSocketGateway()
export class QuestionGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(IQuestionServiceInterface) private questionService: IQuestionService,
  ) {}

  @WebSocketServer() server;

  @SubscribeMessage('getAllQuestions')
  async handleGetQuestions(@ConnectedSocket() client: Socket): Promise<void> {
    const allQuestions = await this.questionService.getAllQuestions();
    client.emit('questions', allQuestions);
  }

  @SubscribeMessage('createQuestion')
  async handleCreateQuestion(
    @MessageBody() data,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const question: CreateQuestionDto = {
        title: data.payload.title,
        description: data.payload.description,
      };

      // Make createdBy into UserDTO to strip password
      const q = await this.questionService.createQuestion(
        question,
        data.payload.category,
        data.payload.createdBy,
      );
      console.log(q);
      this.server.emit('newQuestion', q);
    } catch (e) {
      client.emit('question-create-error', e.message);
    }
  }

  async handleConnection(client: any, ...args: any[]): Promise<any> {
    console.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: any): any {
    console.log('Client disconnected: ' + client.id);
  }

}
