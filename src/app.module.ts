import { Module } from '@nestjs/common';
import { ForumModule } from './forum/forum.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ForumModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
