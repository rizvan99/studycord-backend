import { Injectable } from '@nestjs/common';
import { IReplyService } from '../interface/reply.service.interface';
import { CreateReplyDto } from '../../api/dto/create.reply.dto';
import { User } from '../../../users/model/user.model';
import { Reply } from '../model/reply.model';

@Injectable()
export class ReplyService implements IReplyService {
  async createReply(
    reply: CreateReplyDto,
    createdAt: string,
    createdBy: User,
  ): Promise<void> {}

  async deleteReply(id: number) {}

  async getReplies(): Promise<Reply[]> {
    return Promise.resolve([]);
  }

  async getReplyById(id: number): Promise<void> {}
}
