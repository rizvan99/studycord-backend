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
  async handleGetStocks(@ConnectedSocket() client: Socket): Promise<void> {
    const allCategories = await this.categoryService.getCategories();
    this.server.emit('category-getAll', allCategories);
  }

  handleConnection(client: any, ...args: any[]): any {
    return null;
  }

  handleDisconnect(client: any): any {
    return null;
  }
}
