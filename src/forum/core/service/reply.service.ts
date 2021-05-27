import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReplyService } from '../interface/reply.service.interface';
import { CreateReplyDto } from '../../api/dto/create.reply.dto';
import { User } from '../../../users/model/user.model';
import { Reply } from '../model/reply.model';
import { Question } from '../model/question.model';
import { InjectRepository } from '@nestjs/typeorm';
import QuestionDb from '../../infrastructure/data-source/entities/question.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../../../users/users.service';
import ReplyDb from '../../infrastructure/data-source/entities/reply.entity';
import { UserDto } from '../../../auth/dto/user.dto';

@Injectable()
export class ReplyService implements IReplyService {

  constructor(
    @InjectRepository(ReplyDb)
    private replyRepository: Repository<ReplyDb>,
    private userService: UsersService,
  ) {}

  async createReply(
    reply: CreateReplyDto,
    user: UserDto,
    question: Question,
  ) {
    const createdBy = await this.userService.getById(user.userId);
    const newReply = await this.replyRepository.create({
      ...reply,
      question: question,
      createdBy: createdBy,
      creationDate: Date.now().toString(),
    });
    await this.replyRepository.save(newReply);
    console.log(newReply);
    return newReply;
  }

  async deleteReply(id: number) {
    const deleteResponse = await this.replyRepository.delete(id);
    if (!deleteResponse) {
      throw new HttpException('Reply not found', HttpStatus.NOT_FOUND);
    }
  }

  async getReplies() {
    return await this.replyRepository.find({
      relations: ['question'],
    });
  }

  async getReplyById(id: number) {
    const reply = await this.replyRepository.findOne(id);
    if (reply) {
      return reply;
    }
    throw new HttpException('Reply not found', HttpStatus.NOT_FOUND);
  }


}
