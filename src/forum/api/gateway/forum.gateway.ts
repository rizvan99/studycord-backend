import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CategoryService } from '../../core/service/category.service';
import { Socket } from 'socket.io';
import { ICategoryServiceProvider } from '../../core/interface/category.service.interface';
import { Inject } from '@nestjs/common';

@WebSocketGateway()
export class ForumGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(ICategoryServiceProvider) private categoryService: CategoryService,
  ) {}

  @WebSocketServer() server;

  @SubscribeMessage('getAllCategories')
  async handleGetCategories(@ConnectedSocket() client: Socket): Promise<void> {
    const allCategories = await this.categoryService.getCategories();
    this.server.emit('category-getAll', allCategories);
  }

  async handleConnection(client: any, ...args: any[]): Promise<any> {
    console.log('Client connected: ' + client.id);
    this.server.emit('categories', await this.categoryService.getCategories());
  }

  handleDisconnect(client: any): any {
    return null;
  }
}
