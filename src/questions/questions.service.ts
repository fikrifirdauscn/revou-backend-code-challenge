import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createQuestionDto: CreateQuestionDto) {
    const question = await this.prisma.question.create({
      data: {
        title: createQuestionDto.title,
        content: createQuestionDto.content,
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
      },
    });

    return {
      message: 'Question created successfully',
      data: question,
    };
  }

  async findAll() {
    const questions = await this.prisma.question.findMany({
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
      message: 'Questions fetched successfully',
      data: questions,
    };
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
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

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return {
      message: 'Question fetched successfully',
      data: question,
    };
  }

  async update(
    id: string,
    userId: string,
    updateQuestionDto: UpdateQuestionDto,
  ) {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    if (question.authorId !== userId) {
      throw new ForbiddenException('You are not allowed to update this question');
    }

    const updatedQuestion = await this.prisma.question.update({
      where: {
        id,
      },
      data: {
        title: updateQuestionDto.title,
        content: updateQuestionDto.content,
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
      message: 'Question updated successfully',
      data: updatedQuestion,
    };
  }

  async remove(id: string, userId: string) {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    if (question.authorId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this question');
    }

    await this.prisma.question.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Question deleted successfully',
    };
  }
}