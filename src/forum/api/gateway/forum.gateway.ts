import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {
  ICategoryService,
  ICategoryServiceProvider,
} from '../../core/interface/icategory.service.interface';
import { Inject } from '@nestjs/common';
import { Category } from '../../core/model/category.model';
import { IQuestionService, IquestionServiceProvider } from '../../core/interface/iquestion.service.interface';

@WebSocketGateway()
export class ForumGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(ICategoryServiceProvider) private categoryService: ICategoryService,
    @Inject(IquestionServiceProvider) private questionService: IQuestionService,
  ) {}

  @WebSocketServer() server;

  @SubscribeMessage('getAllCategories')
  async handleGetCategories(@ConnectedSocket() client: Socket): Promise<void> {
    const allCategories = await this.categoryService.getCategories();
    this.server.emit('category-getAll', allCategories);
  }

  @SubscribeMessage('getQuestions')
  async handleGetQuestions(
    @ConnectedSocket() client: Socket,
    @MessageBody() category: Category,
  ): Promise<void> {
    const questions = await this.questionService.getQuestionsFromCategory(
      category.id,
    );
    this.server.emit('questions-get', questions);
  }

  async handleConnection(client: any, ...args: any[]): Promise<any> {
    console.log('Client connected: ' + client.id);
    this.server.emit('categories', await this.categoryService.getCategories());
  }

  handleDisconnect(client: any): any {
    return null;
  }
}
