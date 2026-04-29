import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    questionId: string,
    userId: string,
    createAnswerDto: CreateAnswerDto,
  ) {
    const question = await this.prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const answer = await this.prisma.answer.create({
      data: {
        content: createAnswerDto.content,
        questionId,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        question: {
          select: {
            id: true,
            title: true,
            content: true,
          },
        },
      },
    });

    return {
      message: 'Answer created successfully',
      data: answer,
    };
  }

  async findByQuestion(questionId: string) {
    const question = await this.prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const answers = await this.prisma.answer.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      message: 'Answers fetched successfully',
      data: answers,
    };
  }

  async update(id: string, userId: string, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    });

    if (!answer) {
      throw new NotFoundException('Answer not found');
    }

    if (answer.authorId !== userId) {
      throw new ForbiddenException('You are not allowed to update this answer');
    }

    const updatedAnswer = await this.prisma.answer.update({
      where: {
        id,
      },
      data: {
        content: updateAnswerDto.content,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        question: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return {
      message: 'Answer updated successfully',
      data: updatedAnswer,
    };
  }

  async remove(id: string, userId: string) {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    });

    if (!answer) {
      throw new NotFoundException('Answer not found');
    }

    if (answer.authorId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this answer');
    }

    await this.prisma.answer.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Answer deleted successfully',
    };
  }
}