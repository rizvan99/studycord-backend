import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ForumGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection(client: any, ...args: any[]): any {
    return null;
  }

  handleDisconnect(client: any): any {
    return null;
  }
}
